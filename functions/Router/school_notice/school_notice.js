const express = require('express');
const router = express.Router();
const functions = require('firebase-functions');

router.post('/', async function (req, res) {
    const userFriend = req.body.userRequest.user.properties.isFriend; // 사용자 카카오 채널 정보
    // console.log(userFriend);
    let responseBody;
    /*바로가기 관련 요청문과 버튼명 배열 생성*/
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

    if (userFriend == true) { // 채널을 추가한 사용자인경우
        /*바로가기 작성*/
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
                            text: "💬 원하시는 학교 공지사항 메뉴를 선택해주세요" // 텍스트 뷰 블록으로 출력
                        }
                    }
                ],
                quickReplies: quickReplies // 바로가기 설정
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