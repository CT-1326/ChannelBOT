const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/', async function (req, res) {
    /* 사용자의 카카오 채널 추가 상태를 획인해 데이터 출력 혹은 경고문 출력 */
    const userFriend = req.body.userRequest.user.properties.isFriend;
    // console.log(userFriend);
    let responseBody;

    if (userFriend === true) {
        const normal = await admin
            .database()
            .ref('Library_State/normal')
            .child('state')
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch(err => {
                console.error(err);
            });
        const laptop = await admin
            .database()
            .ref('Library_State/laptop')
            .child('state')
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch(err => {
                console.error(err);
            });
        // console.log(normal, laptop);
        responseBody = {
            version: "2.0",
            template: {
                outputs: [
                    {
                        /* 리스트 카드 뷰 블록 구조로 일반, 노트북 열람실 좌석 현황 출력 */
                        listCard: {
                            "header": {
                                "title": "학술정보관 열람실 좌석 현황",
                                "imageUrl": "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1." +
                                    "daumcdn.net%2Fcfile%2Ftistory%2F1133B8485059B01703"
                            },
                            "items": [
                                {
                                    "title": "1층 일반 열람실",
                                    "description": normal + ' [남은 좌석/전체 좌석]'
                                }, {
                                    "title": "1층 노트북 열람실",
                                    "description": laptop + ' [남은 좌석/전체 좌석]'
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
    } else {
        responseBody = {
            version: "2.0",
            template: {
                outputs: [
                    {
                        simpleText: {
                            text: "🔕 채널봇 채널 추가부터 하셔야 이용이 가능해요!"
                        }
                    }
                ]
            }
        };
    }
    res
        .status(201)
        .send(responseBody);
});

module.exports = router;