const express = require('express');
const router = express.Router();
const functions = require('firebase-functions');

router.post('/', async function (req, res) {
    /* 사용자의 카카오 채널 추가 상태를 획인해 메뉴 바로가기 혹은 경고문 출력 */
    const userFriend = req.body.userRequest.user.properties.isFriend;
    // console.log(userFriend);
    let responseBody;
    const quickReplies = [];
    const messageText = [
        "학사 관련해서 알려줘",
        "새소식 관련해서 알려줘",
        "장학/등록 관련해서 알려줘",
        "입학 관련해서 알려줘",
        "취업 관련해서 알려줘",
        "행사 관련해서 알려줘",
        "글로벌 관련해서 알려줘",
        "일반 관련해서 알려줘",
        "비교과 관련해서 알려줘"
    ];
    const label = [
        "학사",
        "새소식",
        "장학/등록",
        "입학",
        "취업",
        "행사",
        "글로벌",
        "일반",
        "비교과"
    ];

    if (userFriend === true) {
        /* 메뉴 바로가기 내용 작성 및 출력*/
        label.forEach((value, index) => {
            quickReplies.push({
                "messageText": messageText[index],
                "action": "block",
                "blockId": functions
                    .config()
                    .service_key
                    .notice,
                "label": value
            });
        });
        responseBody = {
            version: "2.0",
            template: {
                outputs: [
                    {
                        simpleText: {
                            text: "💬 원하시는 학교 공지사항 메뉴를 선택해주세요"
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