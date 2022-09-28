const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require("axios");
const cheerio = require("cheerio");

exports.notice = functions
    .region('asia-northeast1')
    .https
    .onRequest((req, res) => {
        /* 어드민 인증 key 값이 있는지 요청 상태 인지를 확인해 크롤링 실행 혹은 미실행 */
        if (req.body.admin === functions.config().api_key.admin) {
            axios
                .get('https://www.sungkyul.ac.kr/sites/skukr/index.do#page2') // 학교 메인 페이지 주소
                .then(async (html) => {
                    // eslint-disable-next-line id-length
                    const $ = cheerio.load(html.data);
                    /* 각 공지사항별 게시물의 이름, 업로드 날짜, 페이지 주소 값을 추출하여 배열처리 및 DB에 저장*/
                    const liSize = $('#menu160_obj5589 > div._fnctWrap > div > ul > li').length;
                    // console.log(liSize);
                    const title = new Array();
                    const date = new Array();
                    const url = new Array();

                    for (let index = 1; index <= liSize; index++) {
                        const inliSize = $(
                            '#menu160_obj5589 > div._fnctWrap > div > ul > li:nth-child(' + index + ') > di' +
                            'v > ul > li'
                        ).length;
                        // console.log(inliSize);
                        title[index] = new Array();
                        date[index] = new Array();
                        url[index] = new Array();
                        for (let jndex = 1; jndex <= inliSize; jndex++) {
                            title[index][jndex] = $(
                                '#menu160_obj5589 > div._fnctWrap > div > ul > li:nth-child(' + index + ') > di' +
                                'v > ul > li:nth-child(' + jndex + ') > div > div > a > strong'
                            ).text();
                            date[index][jndex] = $(
                                '#menu160_obj5589 > div._fnctWrap > div > ul > li:nth-child(' + index + ') > di' +
                                'v > ul > li:nth-child(' + jndex + ') > div > span'
                            ).text();
                            url[index][jndex] = $(
                                '#menu160_obj5589 > div._fnctWrap > div > ul > li:nth-child(' + index + ') > di' +
                                'v > ul > li:nth-child(' + jndex + ') > div > div > a'
                            )
                                .attr('href')
                                .replace(/^/, 'https://www.sungkyul.ac.kr');
                        }
                    }
                    console.log("타이틀: ", title);
                    console.log("날짜: ", date);
                    console.log("링크: ", url);

                    const item = [
                        '학사',
                        '새소식',
                        '장학+등록',
                        '입학',
                        '취업',
                        '행사',
                        '글로벌',
                        '일반',
                        '비교과'
                    ];
                    const result = new Object();
                    for (let index = 0; index < item.length; index++) {
                        await admin
                            .database()
                            .ref('School_Notice/' + item[index])
                            .set({
                                title: title[index + 1],
                                date: date[index + 1],
                                url: url[index + 1]
                            });
                        result[index] = {
                            title: title[index + 1],
                            date: date[index + 1],
                            url: url[index + 1]
                        };
                    }

                    /* 개발 모드에는 mocha 테스트 코드 실행을 위해 결과 값을 함께 전송 */
                    /* 배포 모드에는 성공 상태 코드만 전송 */
                    if (process.env.NODE_ENV === 'development') {
                        res
                            .status(201)
                            .send(result);
                    } else {
                        res.sendStatus(201);
                    }
                    console.log('School Notice DB input success');
                })
                .catch(err => {
                    console.error('Error from crawling notice:', err);
                    res.sendStatus(err.response.status);
                });
        } else {
            console.error('No have key');
            res.sendStatus(400);
        }
    });