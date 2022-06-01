const express = require('express');
const router = express.Router();
const functions = require('firebase-functions');
const admin = require('firebase-admin');

router.post('/', async function (req, res) {
    const userFriend = req.body.userRequest.user.properties.isFriend; // 사용자 카카오 채널 정보
    // console.log(userFriend);
    let responseBody;
    /* 바로가기 관련 요청문과 버튼명 배열 생성*/
    const quickReplies = [];
    const messageText = ["면 종류 메뉴를 알려줘", "밥 종류 메뉴를 알려줘", "튀김 종류 메뉴를 알려줘", "모든 메뉴를 알려줘"];
    const label = ["면 종류", "밥 종류", "튀김 종류", "모든 메뉴"];

    if (userFriend === true) { // 채널을 추가한 사용자인경우
        /* 바로가기 작성*/
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
        /* 학식당 이름과 정보를 각각 변수 처리*/
        const title = await admin
            .database()
            .ref('School_Cafe/')
            .child('title')
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch(err => {
                console.error('Error from cafe title :', err);
            });
        const description = await admin
            .database()
            .ref('School_Cafe/')
            .child('description')
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch(err => {
                console.error('Error from cafe description :', err);
            });
        // console.log(title, description);
        responseBody = {
            version: "2.0",
            template: {
                outputs: [
                    {
                        simpleText: { // 학식당 정보와 함께 텍스트 뷰 블록으로 출력
                            text: title + '\n\n' + description + '\n\n💬 보고 싶은 오늘의 학식 종류를 선택해주세요'
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