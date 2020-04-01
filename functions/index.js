const functions = require('firebase-functions');
const express = require('express');
const app = express();
const Nightmare = require('nightmare');
const nightmare = Nightmare({});

const apiRouter = express.Router();
app.use('/api/', apiRouter);

apiRouter.post('/sb', async function (req, res) {
    const text = "스쿨 버스 입력!"

    const responseBody = {
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text: text
                    }
                }
            ]
        }
    };

    res
        .status(200)
        .send(responseBody);
});

apiRouter.post('/sn', async function (req, res) {
    const text = "스쿨 번호 입력!"

    const responseBody = {
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text: text
                    }
                }
            ]
        }
    };

    res
        .status(200)
        .send(responseBody);
});

apiRouter.post('/ls', async function (req, res) {
    const responseBody = {
        version: "2.0",
        template: {
            outputs: [
                {
                    "listCard": {
                        "header": {
                            "title": "학술정보관 열람실 좌석 션황",
                            "imageUrl": "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1." +
                                "daumcdn.net%2Fcfile%2Ftistory%2F1133B8485059B01703"
                        },
                        "items": [
                            {
                                "title": "1층 일반 열람실",
                                "description": "N/N",
                                "imageUrl": "http://k.kakaocdn.net/dn/APR96/btqqH7zLanY/kD5mIPX7TdD2NAxgP29cC0/1x1.jpg",
                                "link": {
                                    "web": "https://namu.wiki/w/%EB%9D%BC%EC%9D%B4%EC%96%B8(%EC%B9%B4%EC%B9%B4%EC%98%A4%ED" +
                                            "%94%84%EB%A0%8C%EC%A6%88)"
                                }
                            }, {
                                "title": "1층 노트북 열람실",
                                "description": "N/N",
                                "imageUrl": "http://k.kakaocdn.net/dn/N4Epz/btqqHCfF5II/a3kMRckYml1NLPEo7nqTmK/1x1.jpg",
                                "link": {
                                    "web": "https://namu.wiki/w/%EB%AC%B4%EC%A7%80(%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%94%84%EB" +
                                            "%A0%8C%EC%A6%88)"
                                }
                            }
                        ]
                    }
                }
            ]
        }
    };

    res
        .status(200)
        .send(responseBody);
});

apiRouter.post('/ci', async function (req, res) {
    const responseBody = {
        version: "2.0",
        template: {
            outputs: [
                {
                    "listCard": {
                        "header": {
                            "title": "학식",
                            "imageUrl": "http://k.kakaocdn.net/dn/xsBdT/btqqIzbK4Hc/F39JI8XNVDMP9jPvoVdxl1/2x1.jpg"
                        },
                        "items": [
                            {
                                "title": "메뉴 이름",
                                "description": "가격",
                                "imageUrl": "http://k.kakaocdn.net/dn/APR96/btqqH7zLanY/kD5mIPX7TdD2NAxgP29cC0/1x1.jpg",
                                "link": {
                                    "web": "https://namu.wiki/w/%EB%9D%BC%EC%9D%B4%EC%96%B8(%EC%B9%B4%EC%B9%B4%EC%98%A4%ED" +
                                            "%94%84%EB%A0%8C%EC%A6%88)"
                                }
                            }, {
                                "title": "메뉴 이름2",
                                "description": "가격",
                                "imageUrl": "http://k.kakaocdn.net/dn/N4Epz/btqqHCfF5II/a3kMRckYml1NLPEo7nqTmK/1x1.jpg",
                                "link": {
                                    "web": "https://namu.wiki/w/%EB%AC%B4%EC%A7%80(%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%94%84%EB" +
                                            "%A0%8C%EC%A6%88)"
                                }
                            }, {
                                "title": "메뉴 이름3",
                                "description": "가격",
                                "imageUrl": "http://k.kakaocdn.net/dn/bE8AKO/btqqFHI6vDQ/mWZGNbLIOlTv3oVF1gzXKK/1x1.jpg",
                                "link": {
                                    "web": "https://namu.wiki/w/%EC%96%B4%ED%94%BC%EC%B9%98"
                                }
                            }
                        ]
                    }
                }
            ]
        }
    };

    res
        .status(200)
        .send(responseBody);
});

apiRouter.post('/og', async function (req, res) {
    const responseBody = {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "carousel": {
                        "type": "basicCard",
                        "items": [
                            {
                                "title": "가게 이름",
                                "description": "위치",
                                "thumbnail": {
                                    "imageUrl": "http://k.kakaocdn.net/dn/83BvP/bl20duRC1Q1/lj3JUcmrzC53YIjNDkqbWK/i_6piz1p.jpg"
                                },
                                "buttons": [
                                    {
                                        "action": "message",
                                        "label": "열어보기",
                                        "messageText": "짜잔! 우리가 찾던 보물입니다"
                                    }, {
                                        "action": "webLink",
                                        "label": "구경하기",
                                        "webLinkUrl": "https://e.kakao.com/t/hello-ryan"
                                    }
                                ]
                            }, {
                                "title": "가게 이름",
                                "description": "위치",
                                "thumbnail": {
                                    "imageUrl": "http://k.kakaocdn.net/dn/83BvP/bl20duRC1Q1/lj3JUcmrzC53YIjNDkqbWK/i_6piz1p.jpg"
                                },
                                "buttons": [
                                    {
                                        "action": "message",
                                        "label": "열어보기",
                                        "messageText": "짜잔! 우리가 찾던 보물입니다"
                                    }, {
                                        "action": "webLink",
                                        "label": "구경하기",
                                        "webLinkUrl": "https://e.kakao.com/t/hello-ryan"
                                    }
                                ]
                            }, {
                                "title": "가게 이름",
                                "description": "위치",
                                "thumbnail": {
                                    "imageUrl": "http://k.kakaocdn.net/dn/83BvP/bl20duRC1Q1/lj3JUcmrzC53YIjNDkqbWK/i_6piz1p.jpg"
                                },
                                "buttons": [
                                    {
                                        "action": "message",
                                        "label": "열어보기",
                                        "messageText": "짜잔! 우리가 찾던 보물입니다"
                                    }, {
                                        "action": "webLink",
                                        "label": "구경하기",
                                        "webLinkUrl": "https://e.kakao.com/t/hello-ryan"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    };

    res
        .status(200)
        .send(responseBody);
});

exports.helloWorld = functions
    .region('asia-northeast1')
    .https
    .onRequest(app);
