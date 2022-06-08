const express = require('express');
const router = express.Router();
const functions = require('firebase-functions');

router.post('/', async (req, res) => {
    const userFriend = req.body.userRequest.user.properties.isFriend; // 사용자 카카오 채널 정보
    const userRequest = req.body.userRequest.utterance; // 사용자 요청문
    // console.log(userRequest);
    let responseBody;
    const quickReplies = [
        {
            // 바로가기 작성
            "messageText": "뒤로 돌아갈래",
            "action": "block",
            "blockId": functions
                .config()
                .service_key
                .wifi_hub,
            "label": "↩ 뒤로가기"
        }
    ];

    if (userFriend === true) { // 채널을 추가한 사용자인경우
        /* 사용자 요청문 내용에 따라 개별 처리 */
        switch (userRequest) {
            case "안드로이드야":
                responseBody = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleImage: { // 이미지 뷰 블록으로 출력
                                    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/channelbot-d349b.appspot.com/o/10." +
                                        "241.0.2_wifi4.php%20(1).png?alt=media&token=ef46a504-c13f-44ff-b694-a8dc09a666" +
                                        "56",
                                    "altText": "안드로이드일 때 연결 가이드"
                                }
                            }
                        ],
                        quickReplies: quickReplies
                    }
                };
                break;

            case "IOS야":
                responseBody = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleImage: {
                                    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/channelbot-d349b.appspot.com/o/10." +
                                        "241.0.2_wifi4.php%20(2).png?alt=media&token=9e5ca57e-e4e5-489f-a636-d6bcb86a80" +
                                        "47",
                                    "altText": "IOS일 때 연결 가이드"
                                }
                            }
                        ],
                        quickReplies: quickReplies
                    }
                };
                break;

            case "윈도우야":
                responseBody = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleImage: {
                                    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/channelbot-d349b.appspot.com/o/10." +
                                        "241.0.2_wifi4.php.png?alt=media&token=1d71f4a1-207c-4276-aa13-0a47ba209b51",
                                    "altText": "윈도우일 때 연결 가이드"
                                }
                            }
                        ],
                        quickReplies: quickReplies
                    }
                };
                break;

            default:
                break;
        }
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