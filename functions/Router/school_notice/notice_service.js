const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const userRequest = req.body.userRequest.utterance; // 사용자 요청문
    // console.log(userRequest);
    let titleResult,
        dateResult,
        urlResult;
    let items = [];
    let responseBody;

    switch (userRequest) {
        case "학사 관련해서 알려줘":
            [titleResult, dateResult, urlResult] = await getData('School_Notice/학사'); // 해당 게시판의 제목, 날짜, 경로 데이터를 get
            // console.log(titleResult, dateResult, urlResult);
            /*리스트 뷰 본문 작성*/
            titleResult.forEach((value, index) => {
                items.push({
                    "title": value,
                    "description": dateResult[index],
                    "link": {
                        "web": urlResult[index]
                    }
                });
            });
            responseBody = {
                version: "2.0",
                template: {
                    outputs: [
                        {
                            "listCard": { // 리스트 카드 뷰 블록으로 출력
                                "header": {
                                    "title": "학사 공지사항"
                                },
                                "items": items,
                                "buttons": [
                                    {
                                        "label": "학사 공지사항 페이지",
                                        "action": "webLink",
                                        "webLinkUrl": "https://www.sungkyul.ac.kr/skukr/343/subview.do"
                                    }
                                ]
                            }
                        }
                    ]
                }
            };
            break;

        case "새소식 관련해서 알려줘":
            [titleResult, dateResult, urlResult] = await getData('School_Notice/새소식');
            // console.log(titleResult, dateResult, urlResult);
            titleResult.forEach((value, index) => {
                items.push({
                    "title": value,
                    "description": dateResult[index],
                    "link": {
                        "web": urlResult[index]
                    }
                });
            });
            responseBody = {
                version: "2.0",
                template: {
                    outputs: [
                        {
                            "listCard": {
                                "header": {
                                    "title": "새소식 공지사항"
                                },
                                "items": items,
                                "buttons": [
                                    {
                                        "label": "새소식 공지사항 페이지",
                                        "action": "webLink",
                                        "webLinkUrl": "https://www.sungkyul.ac.kr/skukr/342/subview.do"
                                    }
                                ]
                            }
                        }
                    ]
                }
            };
            break;

        case "장학/등록 관련해서 알려줘":
            [titleResult, dateResult, urlResult] = await getData('School_Notice/장학+등록');
            // console.log(titleResult, dateResult, urlResult);
            titleResult.forEach((value, index) => {
                items.push({
                    "title": value,
                    "description": dateResult[index],
                    "link": {
                        "web": urlResult[index]
                    }
                });
            });
            responseBody = {
                version: "2.0",
                template: {
                    outputs: [
                        {
                            "listCard": {
                                "header": {
                                    "title": "장학/등록 공지사항"
                                },
                                "items": items,
                                "buttons": [
                                    {
                                        "label": "장학/등록 공지사항 페이지",
                                        "action": "webLink",
                                        "webLinkUrl": "https://www.sungkyul.ac.kr/skukr/344/subview.do"
                                    }
                                ]
                            }
                        }
                    ]
                }
            };
            break;

        case "입학 관련해서 알려줘":
            [titleResult, dateResult, urlResult] = await getData('School_Notice/입학');
            // console.log(titleResult, dateResult, urlResult);
            titleResult.forEach((value, index) => {
                items.push({
                    "title": value,
                    "description": dateResult[index],
                    "link": {
                        "web": urlResult[index]
                    }
                });
            });
            responseBody = {
                version: "2.0",
                template: {
                    outputs: [
                        {
                            "listCard": {
                                "header": {
                                    "title": "입학 공지사항"
                                },
                                "items": items,
                                "buttons": [
                                    {
                                        "label": "입학 공지사항 페이지",
                                        "action": "webLink",
                                        "webLinkUrl": "https://www.sungkyul.ac.kr/skukr/345/subview.do"
                                    }
                                ]
                            }
                        }
                    ]
                }
            };
            break;

        case "취업 관련해서 알려줘":
            [titleResult, dateResult, urlResult] = await getData('School_Notice/취업');
            // console.log(titleResult, dateResult, urlResult);
            titleResult.forEach((value, index) => {
                items.push({
                    "title": value,
                    "description": dateResult[index],
                    "link": {
                        "web": urlResult[index]
                    }
                });
            });
            responseBody = {
                version: "2.0",
                template: {
                    outputs: [
                        {
                            "listCard": {
                                "header": {
                                    "title": "취업 공지사항"
                                },
                                "items": items,
                                "buttons": [
                                    {
                                        "label": "취업 공지사항 페이지",
                                        "action": "webLink",
                                        "webLinkUrl": "https://www.sungkyul.ac.kr/skukr/346/subview.do"
                                    }
                                ]
                            }
                        }
                    ]
                }
            };
            break;

        case "행사 관련해서 알려줘":
            [titleResult, dateResult, urlResult] = await getData('School_Notice/행사');
            // console.log(titleResult, dateResult, urlResult);
            titleResult.forEach((value, index) => {
                items.push({
                    "title": value,
                    "description": dateResult[index],
                    "link": {
                        "web": urlResult[index]
                    }
                });
            });
            responseBody = {
                version: "2.0",
                template: {
                    outputs: [
                        {
                            "listCard": {
                                "header": {
                                    "title": "행사 공지사항"
                                },
                                "items": items,
                                "buttons": [
                                    {
                                        "label": "행사 공지사항 페이지",
                                        "action": "webLink",
                                        "webLinkUrl": "https://www.sungkyul.ac.kr/skukr/347/subview.do"
                                    }
                                ]
                            }
                        }
                    ]
                }
            };
            break;

        case "글로벌 관련해서 알려줘":
            [titleResult, dateResult, urlResult] = await getData('School_Notice/글로벌');
            // console.log(titleResult, dateResult, urlResult);
            titleResult.forEach((value, index) => {
                items.push({
                    "title": value,
                    "description": dateResult[index],
                    "link": {
                        "web": urlResult[index]
                    }
                });
            });
            responseBody = {
                version: "2.0",
                template: {
                    outputs: [
                        {
                            "listCard": {
                                "header": {
                                    "title": "글로벌 공지사항"
                                },
                                "items": items,
                                "buttons": [
                                    {
                                        "label": "글로벌 공지사항 페이지",
                                        "action": "webLink",
                                        "webLinkUrl": "https://www.sungkyul.ac.kr/skukr/348/subview.do"
                                    }
                                ]
                            }
                        }
                    ]
                }
            };
            break;

        case "일반 관련해서 알려줘":
            [titleResult, dateResult, urlResult] = await getData('School_Notice/일반');
            // console.log(titleResult, dateResult, urlResult);
            titleResult.forEach((value, index) => {
                items.push({
                    "title": value,
                    "description": dateResult[index],
                    "link": {
                        "web": urlResult[index]
                    }
                });
            });
            responseBody = {
                version: "2.0",
                template: {
                    outputs: [
                        {
                            "listCard": {
                                "header": {
                                    "title": "일반 공지사항"
                                },
                                "items": items,
                                "buttons": [
                                    {
                                        "label": "일반 공지사항 페이지",
                                        "action": "webLink",
                                        "webLinkUrl": "https://www.sungkyul.ac.kr/skukr/349/subview.do"
                                    }
                                ]
                            }
                        }
                    ]
                }
            };
            break;

        case "비교과 관련해서 알려줘":
            [titleResult, dateResult, urlResult] = await getData('School_Notice/비교과');
            // console.log(titleResult, dateResult, urlResult);
            titleResult.forEach((value, index) => {
                items.push({
                    "title": value,
                    "description": dateResult[index],
                    "link": {
                        "web": urlResult[index]
                    }
                });
            });
            responseBody = {
                version: "2.0",
                template: {
                    outputs: [
                        {
                            "listCard": {
                                "header": {
                                    "title": "비교과 공지사항"
                                },
                                "items": items,
                                "buttons": [
                                    {
                                        "label": "비교과 공지사항 페이지",
                                        "action": "webLink",
                                        "webLinkUrl": "https://www.sungkyul.ac.kr/skukr/354/subview.do"
                                    }
                                ]
                            }
                        }
                    ]
                }
            };
            break;

        default:
            break;
    }

    /*요청 받은 게시판의 게시물 데이터 get 처리 함수*/
    async function getData(params) {
        let title = new Array();
        let date = new Array();
        let url = new Array();

        await admin
            .database()
            .ref(params)
            .child('title')
            .once('value')
            .then(snapshot => {
                snapshot.forEach(item => {
                    title.push(item.val()); // 제목 데이터 get
                })
            })
            .catch(e => {
                console.error('Error from notice title :', e);
            });
        await admin
            .database()
            .ref(params)
            .child('date')
            .once('value')
            .then(snapshot => {
                snapshot.forEach(item => {
                    date.push(item.val()); // 날짜 데이터 get
                })
            })
            .catch(e => {
                console.error('Error from notice date :', e);
            });
        await admin
            .database()
            .ref(params)
            .child('url')
            .once('value')
            .then(snapshot => {
                snapshot.forEach(item => {
                    url.push(item.val()); // 경로 데이터 get
                })
            })
            .catch(e => {
                console.error('Error from notice url :', e);
            });

        return [title, date, url]; // get 처리 된 변수를 반환
    };
    res
        .status(201)
        .send(responseBody); // 응답 상태 코드와 내용 전송
});

module.exports = router;