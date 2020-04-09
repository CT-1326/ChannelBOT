const express = require('express');
const router = express.Router();

router.post('/', async function (req, res) {
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

module.exports = router;