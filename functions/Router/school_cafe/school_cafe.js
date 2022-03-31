const express = require('express');
const router = express.Router();
const functions = require('firebase-functions');
const admin = require('firebase-admin');

router.post('/', async function (req, res) {
    const userFriend = req.body.userRequest.user.properties.isFriend;
    // console.log(userFriend);
    let responseBody;

    if (userFriend == true) {
        const title = await admin
            .database()
            .ref('School_Cafe/')
            .child('title')
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch(e => {
                console.error('Error from cafe title :', e);
            });
        const description = await admin
            .database()
            .ref('School_Cafe/')
            .child('description')
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch(e => {
                console.error('Error from cafe description :', e);
            });
        responseBody = {
            version: "2.0",
            template: {
                outputs: [
                    {
                        simpleText: {
                            text: title + '\n' + description + '\n\n💬 보고 싶은 오늘의 학식 종류를 선택해주세요'
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
        .status(201)
        .send(responseBody);
});

module.exports = router;