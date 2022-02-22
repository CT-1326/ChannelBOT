const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/', async function (req, res) {
    const userFriend = req.body.userRequest.user.properties.isFriend;
    // console.log(userFriend);
    let responseBody;

    if (userFriend == true) {
        const bus = await admin
            .database()
            .ref('School_Bus/')
            .child('info')
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
                        simpleText: {
                            text: bus
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
        .status(200)
        .send(responseBody);
});

module.exports = router;