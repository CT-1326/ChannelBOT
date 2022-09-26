const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/', async function (req, res) {
    /* 사용자의 카카오 채널 추가 상태를 획인해 데이터 출력 혹은 경고문 출력 */
    const userFriend = req.body.userRequest.user.properties.isFriend;
    // console.log(userFriend);
    let responseBody;

    if (userFriend === true) {
        const number = await admin
            .database()
            .ref('School_Number/')
            .child('info')
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch(err => {
                console.error(err);
            });
        // console.log(number);
        responseBody = {
            version: "2.0",
            template: {
                outputs: [
                    {
                        simpleText: {
                            text: number
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