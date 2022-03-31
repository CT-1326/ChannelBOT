const express = require('express');
const router = express.Router();
const functions = require('firebase-functions');
const admin = require('firebase-admin');

router.post('/', async function (req, res) {
    const userFriend = req.body.userRequest.user.properties.isFriend;
    // console.log(userFriend);
    let responseBody;
    const quickReplies = [];
    const messageText = ["면 종류 메뉴를 알려줘", "밥 종류 메뉴를 알려줘", "튀김 종류 메뉴를 알려줘"];
    const label = ["면 종류", "밥 종류", "튀김 종류"];

    if (userFriend == true) {
        label.forEach((value, index) => {
            quickReplies.push({
                "messageText": messageText[index],
                "action": "block",
                "blockId": functions
                    .config()
                    .service_key
                    .cafe,
                "label": value
            });
        });
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
                            text: title + '\n\n' + description + '\n\n💬 보고 싶은 오늘의 학식 종류를 선택해주세요'
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