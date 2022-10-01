const express = require('express');
const router = express.Router();
const functions = require('firebase-functions');

router.post('/', async function (req, res) {
    /* 사용자의 카카오 채널 추가 상태를 획인해 메뉴 바로가기 혹은 경고문 출력 */
    const userFriend = req.body.userRequest.user.properties.isFriend;
    // console.log(userFriend);
    let responseBody;
    const quickReplies = [];
    const messageText = ["안드로이드야", "IOS야", "윈도우야"];
    const label = ["안드로이드", "IOS", "윈도우"];

    if (userFriend === true) {
        /* 바로가기 내용 작성 및 출력*/
        label.forEach((value, index) => {
            quickReplies.push({
                "messageText": messageText[index],
                "action": "block",
                "blockId": functions
                    .config()
                    .service_key
                    .wifi,
                "label": value
            });
        });
        responseBody = {
            version: "2.0",
            template: {
                outputs: [
                    {
                        simpleText: {
                            text: '💬 본인의 운영체제를 선택해주세요'
                        }
                    }
                ],
                quickReplies: quickReplies
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