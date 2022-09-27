const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require("axios");
const cheerio = require("cheerio");

exports.cafe = functions
    .region('asia-northeast1')
    .https
    .onRequest((req, res) => {
        /* 어드민 인증 key 값이 있는지 요청 상태 인지를 확인해 크롤링 실행 혹은 미실행 */
        if (req.body.admin === functions.config().api_key.admin) {
            axios
                .get('https://www.sungkyul.ac.kr/skukr/340/subview.do') // 학식 안내 페이지 주소
                .then(async (html) => {
                    // eslint-disable-next-line id-length
                    const $ = cheerio.load(html.data);
                    /* 학식당 소개 구간 추출*/
                    const title = $(
                        '#menu340_obj2839 > div._fnctWrap.diet > div.info > div.box-info > dl > dt'
                    )
                        .text()
                        .trim();
                    // console.log(title);
                    const description = $(
                        '#menu340_obj2839 > div._fnctWrap.diet > div.info > div.box-info > dl > dd:nth-' +
                        'child(2)'
                    )
                        .text()
                        .trim()
                        .replace(/\t/g, '')
                        .replace(/\n/g, '')
                        .concat('\n', $(
                            '#menu340_obj2839 > div._fnctWrap.diet > div.info > div.box-info > dl > dd:nth-' +
                            'child(3)'
                        ).text().trim().replace(/\t/g, '').replace(/\n/g, ''));
                    // console.log(description);
                    const trSize = $('#viewForm > div > table > tbody > tr').length;
                    // console.log(trSize);
                    const result = new Array();
                    /* 요일별 학식 메뉴 안내 구간 추출*/
                    for (let index = 1; index <= trSize; index++) {
                        const tdSize = $(
                            '#viewForm > div > table > tbody > tr:nth-child(' + index + ') > td'
                        ).length;
                        // console.log(tdSize);
                        result[index] = new Array();
                        for (let jndex = 2; jndex <= tdSize - 2; jndex++) {
                            result[index][jndex - 1] = $(
                                '#viewForm > div > table > tbody > tr:nth-child(' + index +
                                ') > td:nth-child(' + jndex + ')'
                            )
                                .text()
                                .replace(/ⓣ/g, '')
                                .replace(/,/g, '\n');
                        }
                    }
                    // console.log(result);

                    /* 추출한 학식당 정보를 DB에 저장*/
                    await admin
                        .database()
                        .ref('School_Cafe/')
                        .set({title: `${title}`, description: `${description}`});
                    const menuCount = $("#viewForm > div > table > tbody > tr").length;
                    // console.log(menuCount);
                    const menuTitle = [];
                    /* 학식의 종류 명칭 구간 추출*/
                    for (let index = 1; index <= menuCount; index++) {
                        menuTitle[index] = $(
                            "#viewForm > div > table > tbody > tr:nth-child(" + index +
                            ") > td:nth-child(1)"
                        ).text();
                    }
                    // console.log(menuTitle);
                    /* 추출한 학식 종류 명칭에 맞춰 요일별 학식 데이터를 DB에 저장*/
                    for (let index = 1; index < menuTitle.length; index++) {
                        await admin
                            .database()
                            .ref('School_Cafe/' + menuTitle[index])
                            .update({menu: result[index]});
                    }
                    /* 개발 모드에는 mocha 테스트 코드 실행을 위해 결과 값을 함께 전송 */
                    /* 배포 모드에는 성공 상태 코드만 전송 */
                    if (process.env.NODE_ENV === 'development') {
                        res
                            .status(201)
                            .send(
                                {title: title, description: description, menuTitle: menuTitle, menus: result}
                            );
                    } else {
                        res.sendStatus(201);
                    }
                    console.log('School Cafe DB input success');
                })
                .catch(err => {
                    console.error('Error from crawling cafe:', err);
                    res.sendStatus(err.response.status);
                });
        } else {
            console.error('No have key');
            res.sendStatus(400);
        }
    });