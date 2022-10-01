const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();
const functions = require('firebase-functions');

router.post('/', async (req, res) => {
    /* 사용자의 카카오 채널 추가 상태를 획인해 사용자가 요청한 공지사항 데이터 혹은 경고문 출력 */
    const userRequest = req.body.userRequest.utterance; 
    // console.log(userRequest);
    let titleResult,
        dateResult,
        urlResult;
    let items = [];
    let responseBody;
    /* 뒤로가기 작성 */
    const quickReplies = [
        {
            "messageText": "뒤로 돌아갈래",
            "action": "block",
            "blockId": functions
                .config()
                .service_key
                .notice_hub,
            "label": "↩ 뒤로가기"
        }
    ];

    /* 각 공지사항별 게시물 제목, 업로드 날짜, 페이지 주소 값을 리스트 뷰 블록 내용으로 작성 및 출력 */
    switch (userRequest) {
        case "학사 관련해서 알려줘":
            [titleResult, dateResult, urlResult] = await getData('School_Notice/학사'); 
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
                            listCard: {
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
                    ],
                    quickReplies: quickReplies 
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
                            listCard: {
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
                    ],
                    quickReplies: quickReplies
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
                            listCard: {
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
                    ],
                    quickReplies: quickReplies
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
                            listCard: {
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
                    ],
                    quickReplies: quickReplies
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
                            listCard: {
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
                    ],
                    quickReplies: quickReplies
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
                            listCard: {
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
                    ],
                    quickReplies: quickReplies
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
                            listCard: {
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
                    ],
                    quickReplies: quickReplies
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
                            listCard: {
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
                    ],
                    quickReplies: quickReplies
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
                            listCard: {
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
                    ],
                    quickReplies: quickReplies
                }
            };
            break;

        default:
            break;
    }

    /* 공지사항 데이터 GET 처리*/
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
                    title.push(item.val());
                });
            })
            .catch(err => {
                console.error('Error from notice title :', err);
            });
        await admin
            .database()
            .ref(params)
            .child('date')
            .once('value')
            .then(snapshot => {
                snapshot.forEach(item => {
                    date.push(item.val()); 
                });
            })
            .catch(err => {
                console.error('Error from notice date :', err);
            });
        await admin
            .database()
            .ref(params)
            .child('url')
            .once('value')
            .then(snapshot => {
                snapshot.forEach(item => {
                    url.push(item.val()); 
                });
            })
            .catch(err => {
                console.error('Error from notice url :', err);
            });

        return [title, date, url]; 
    }
    res
        .status(201)
        .send(responseBody); 
});

module.exports = router;