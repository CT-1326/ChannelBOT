const express = require('express');
const router = express.Router();
const functions = require('firebase-functions');

router.post('/', async function (req, res) {
    const userFriend = req.body.userRequest.user.properties.isFriend;
    // console.log(userFriend);
    let responseBody;

    if (userFriend == true) {
        responseBody = {
            version: "2.0",
            template: {
                outputs: [
                    {
                        simpleText: {
                            text: "[중생관 지하1층 학식당]\n보고 싶은 오늘의 학식 종류를 선택해주세요\n\n* 학식당은 오전 11시부터 오후 6시30분까지 운영됩니다! (" +
                                "Break time 15:30 ~ 16:30)"
                        }
                    }
                ],
                quickReplies: [
                    {
                        "messageText": "면 종류 메뉴 알려줘",
                        "action": "block",
                        "blockId": functions
                            .config()
                            .service_key
                            .cafe,
                        "label": "면 종류"
                    }, {
                        "messageText": "밥 종류 메뉴 알려줘",
                        "action": "block",
                        "blockId": functions
                            .config()
                            .service_key
                            .cafe,
                        "label": "밥 종류"
                    }, {
                        "messageText": "튀김 종류 메뉴 알려줘",
                        "action": "block",
                        "blockId": functions
                            .config()
                            .service_key
                            .cafe,
                        "label": "튀김 종류"
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
        .status(200)
        .send(responseBody);
});

module.exports = router;