const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/', async function (req, res) {
    /* 사용자의 카카오 채널 추가 상태를 획인해 데이터 출력 혹은 경고문 출력 */
    const userFriend = req.body.userRequest.user.properties.isFriend;
    // console.log(userFriend);
    let responseBody;

    if (userFriend === true) {
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
                        /* 캐러셀 구조의 아이템 카드형 응답 블록으로 셔틀버스 시간표 출력 */
                        carousel: {
                            type: "itemCard",
                            items: [
                                {
                                    "head": {
                                        "title": `${inBus.title}`
                                    },
                                    "itemList": [
                                        {
                                            /* 시간대와 시간 간격을 제목, 본문으로 나누어 출력 */
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
    } else {
        responseBody = {
            version: "2.0",
            template: {
                outputs: [
                    {
                        simpleText: {
                            text: "🔕 채널봇 채널 추가부터 하셔야 이용이 가능해요!!"
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