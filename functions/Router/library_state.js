const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/', async function (req, res) {
    const text = await admin
        .database()
        .ref('Library_State/1f_normal')
        .child('state')
        .once('value')
        .then((snapshot) => {
            return snapshot.val();
        })
        .catch((e) => {
            console.log(e);
        });
    const text2 = await admin
        .database()
        .ref('Library_State/1f_laptop')
        .child('state')
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
                            "title": "학술정보관 열람실 좌석 현황",
                            "imageUrl": "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1." +
                                "daumcdn.net%2Fcfile%2Ftistory%2F1133B8485059B01703"
                        },
                        "items": [
                            {
                                "title": "1층 일반 열람실",
                                "description": text + ' [남은 좌석/전체 좌석]'
                            }, {
                                "title": "1층 노트북 열람실",
                                "description": text2 + ' [남은 좌석/전체 좌석]'
                            }
                        ],
                        "buttons": [
                            {
                                "label": "학술정보관 사이트",
                                "action": "webLink",
                                "webLinkUrl": "http://library.sungkyul.ac.kr/lib/SlimaPlus.csp"
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