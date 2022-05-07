const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/', async function (req, res) {
    const userFriend = req.body.userRequest.user.properties.isFriend; // 사용자 카카오 채널 정보
    // console.log(userFriend);
    let responseBody;

    if (userFriend == true) { // 채널을 추가한 사용자인경우
        const number = await admin // 전화번호 안내 데이터 변수 처리
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
                            text: number // 텍스트 뷰 블록으로 출력
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