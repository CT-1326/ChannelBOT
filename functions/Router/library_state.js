const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/', async function (req, res) {
    const userFriend = req.body.userRequest.user.properties.isFriend; // 사용자 카카오 채널 정보
    // console.log(userFriend);
    let responseBody;

    if (userFriend == true) { // 채널을 추가한 사용자인경우
        /*일반 그리고 노트북 열람실 좌석 데이터 변수 처리*/
        const normal = await admin
            .database()
            .ref('Library_State/1f_normal')
            .child('state')
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch((e) => {
                console.error(e);
            });
        const laptop = await admin
            .database()
            .ref('Library_State/1f_laptop')
            .child('state')
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch((e) => {
                console.error(e);
            });

        responseBody = {
            version: "2.0",
            template: {
                outputs: [
                    {
                        listCard: { // 리스트 카드 뷰 블록으로 출력
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
    } else { // 채널을 추가하지 않은 사용자인경우
        responseBody = {
            version: "2.0",
            template: {
                outputs: [
                    {
                        simpleText: {
                            text: "🔕 채널봇 채널 추가부터 하셔야 이용이 가능해요!" // 텍스트 뷰 블록으로 출력
                        }
                    }
                ]
            }
        };
    }
    res
        .status(201)
        .send(responseBody); // 응답 상태 코드와 내용 전송
});

module.exports = router;