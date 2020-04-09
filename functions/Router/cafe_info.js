const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/', async function (req, res) {
    const text = await admin
    .database()
    .ref('Cafe_info/')
    .child('일식')
    .once('value')
    .then((snapshot) => {
        return snapshot.val();
    })
    .catch((e) => {
        console.log(e);
    });

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
                                "title": text,
                                "description": "가격",
                                "imageUrl": "http://k.kakaocdn.net/dn/APR96/btqqH7zLanY/kD5mIPX7TdD2NAxgP29cC0/1x1.jpg",
                                "link": {
                                    "web": "https://namu.wiki/w/%EB%9D%BC%EC%9D%B4%EC%96%B8(%EC%B9%B4%EC%B9%B4%EC%98%A4%ED" +
                                            "%94%84%EB%A0%8C%EC%A6%88)"
                                }
                            }, {
                                "title": text,
                                "description": "가격",
                                "imageUrl": "http://k.kakaocdn.net/dn/N4Epz/btqqHCfF5II/a3kMRckYml1NLPEo7nqTmK/1x1.jpg",
                                "link": {
                                    "web": "https://namu.wiki/w/%EB%AC%B4%EC%A7%80(%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%94%84%EB" +
                                            "%A0%8C%EC%A6%88)"
                                }
                            }, {
                                "title": text,
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

module.exports = router;