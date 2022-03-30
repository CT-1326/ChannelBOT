const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/', async function (req, res) {
    const userFriend = req.body.userRequest.user.properties.isFriend;
    // console.log(userFriend);
    let responseBody;

    if (userFriend == true) {
        const inBus = await admin
            .database()
            .ref('School_Bus/')
            .child('in')
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch((e) => {
                console.error(e);
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
            .catch((e) => {
                console.error(e);
            });
        // console.log(outBus);
        responseBody = {
            version: "2.0",
            template: {
                outputs: [
                    {
                        carousel: {
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