const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require("axios");
const cheerio = require("cheerio");

exports.bus = functions
    .region('asia-northeast1')
    .https
    .onRequest((req, res) => {
        /* 어드민 인증 key 값이 있는지 요청 상태 인지를 확인해 크롤링 실행 혹은 미실행 */
        if (req.body.admin === functions.config().api_key.admin) {
            axios
                .get('https://www.sungkyul.ac.kr/skukr/262/subview.do') // 셔틀버스 안내 페이지 주소
                .then(async (html) => {
                    // eslint-disable-next-line id-length
                    const $ = cheerio.load(html.data);
                    /* 명학역 -> 학교 관련 버스 안내 구간 텍스트 추출*/
                    const inTitle = $("#menu262_obj3182 > h3").text();
                    const inBody = $("#menu262_obj3183 > ul > li:nth-child(1)").text();
                    const inBody2 = $("#menu262_obj3183 > ul > li:nth-child(2)").text();
                    console.log(inTitle);
                    console.log(inBody, inBody2);
                    /* 학교 -> 명학역 관련 버스 안내 구간 텍스트 추출*/
                    const outTitle = $("#menu262_obj3185 > h3").text();
                    const outBody = $("#menu262_obj3186 > ul > li:nth-child(1)").text();
                    const outBody2 = $("#menu262_obj3186 > ul > li:nth-child(2)").text();
                    console.log(outTitle);
                    console.log(outBody, outBody2);

                    /* 각각의 추출구간에 맞춰 추출한 셔틀버스 안내 데이터를 DB에 저장*/
                    await admin
                        .database()
                        .ref('School_Bus/')
                        .set({
                            in: {
                                title: `${inTitle}`,
                                start: `${inBody}`,
                                end: `${inBody2}`
                            },
                            out: {
                                title: `${outTitle}`,
                                start: `${outBody}`,
                                end: `${outBody2}`
                            }
                        });

                    /* 개발/배포 모드에 따라 결과 값 전송 혹은 미전송 */
                    if (process.env.NODE_ENV) {
                        const result = { in: {
                                title: `${inTitle}`,
                                start: `${inBody}`,
                                end: `${inBody2}`
                            },
                            out: {
                                title: `${outTitle}`,
                                start: `${outBody}`,
                                end: `${outBody2}`
                            }
                        };
                        res
                            .status(201)
                            .send(result);
                    } else {
                        res.sendStatus(201);
                    }
                    console.log('School Bus DB input success');
                })
                .catch(err => {
                    console.error('Error from crawling bus:', err);
                    res.sendStatus(err.response.status);
                });
        } else {
            console.error('No have key');
            res.sendStatus(400);
        }
    });