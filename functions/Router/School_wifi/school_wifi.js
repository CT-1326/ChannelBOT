const express = require('express');
const router = express.Router();
const functions = require('firebase-functions');
const admin = require('firebase-admin');

router.post('/', async function (req, res) {
    const userFriend = req.body.userRequest.user.properties.isFriend; // 사용자 카카오 채널 정보
    // console.log(userFriend);
    let responseBody;
    /*바로가기 관련 요청문과 버튼명 배열 생성*/
    const quickReplies = [];
    const messageText = ["안드로이드야", "IOS야", "윈도우야"];
    const label = ["안드로이드", "IOS", "윈도우"];

    if (userFriend == true) { // 채널을 추가한 사용자인경우
        /*바로가기 작성*/
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
                        simpleText: { // 텍스트 뷰 블록으로 출력
                            text: '💬 본인의 운영체제를 선택해주세요'
                        }
                    }
                ],
                quickReplies: quickReplies // 바로가기 출력
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