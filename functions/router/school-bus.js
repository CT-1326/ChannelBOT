const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/', async function (req, res) {
    const userFriend = req.body.userRequest.user.properties.isFriend; // 사용자 카카오 채널 정보
    // console.log(userFriend);
    let responseBody;

    if (userFriend === true) { // 채널을 추가한 사용자인 경우
        /* 출발과 도착 그리고 그 반대 경로의 버스 안내 데이터를 각각 변수처리*/
        const inBus = await admin
            .database()
            .ref('School_Bus/')
            .child('in')
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch(err => {
                console.error(err);
            });
        // console.log(inBus);
        const outBus = await admin
            .database()
            .ref('School_Bus/')
            .child('out')
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch(err => {
                console.error(err);
            });
        // console.log(outBus);
        responseBody = {
            version: "2.0",
            template: {
                outputs: [
                    {
                        carousel: { // 캐러셀 구조의 아이템 카드형 응답 블록 출력
                            type: "itemCard",
                            items: [
                                {
                                    "head": {
                                        "title": `${inBus.title}`
                                    },
                                    "itemList": [
                                        {
                                            "title": `${inBus
                                                .start
                                                .substr(0, 3)
                                                .replace(':', '')
                                                .trim()}`,
                                            "description": `${inBus
                                                .start
                                                .substr(5)
                                                .trim()}`
                                        }, {
                                            "title": `${inBus
                                                .end
                                                .substr(0, 3)
                                                .replace(':', '')
                                                .trim()}`,
                                            "description": `${inBus
                                                .end
                                                .substr(5)
                                                .trim()}`
                                        }
                                    ],
                                    "title": "해당 안내 내용은 학교 홈페이지의 내용을 기반으로 작성되었습니다."
                                }, {
                                    "head": {
                                        "title": `${outBus.title}`
                                    },
                                    "itemList": [
                                        {
                                            "title": `${outBus
                                                .start
                                                .substr(0, 3)
                                                .replace(':', '')
                                                .trim()}`,
                                            "description": `${outBus
                                                .start
                                                .substr(4)
                                                .trim()}`
                                        }, {
                                            "title": `${outBus
                                                .end
                                                .substr(0, 3)
                                                .replace(':', '')
                                                .trim()}`,
                                            "description": `${outBus
                                                .end
                                                .substr(4)
                                                .trim()}`
                                        }
                                    ],
                                    "title": "해당 안내 내용은 학교 홈페이지의 내용을 기반으로 작성되었습니다."
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