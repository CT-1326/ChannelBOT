const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/', async function (req, res) {
    const userFriend = req.body.userRequest.user.properties.isFriend; // 사용자 카카오 채널 정보
    // console.log(userFriend);
    let responseBody;
    const title = ['현재 온도', '체감 온도', '최고 기온', '최저 기온'];
    const description = [];
    let itemList = [];

    if (userFriend == true) { // 채널을 추가한 사용자인 경우
        /* 온도 그리고 기상 조건 데이터를 각각 변수처리*/
        const mainWeather = await admin
            .database()
            .ref('School_Weather/')
            .child('main')
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch(err => {
                console.error(err);
            });
        // console.log(mainWeather);
        const statWeather = await admin
            .database()
            .ref('School_Weather/')
            .child('weather')
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch(err => {
                console.error(err);
            });
        // console.log(statWeather);
        
        /* 아이템 카드 뷰 본문 작성*/
        description.push(
            parseFloat(mainWeather.temp) - 273.15,
            parseFloat(mainWeather.feels) - 273.15,
            parseFloat(mainWeather.temp_max) - 273.15,
            parseFloat(mainWeather.temp_min) - 273.15
        );
        title.forEach((value, index) => {
            itemList.push({
                "title": value,
                "description": parseInt(description[index]) + '도'
            });
        });
        // console.log(itemList);
        responseBody = {
            version: "2.0",
            template: {
                outputs: [
                    {
                        itemCard: { // 아이템 카드 뷰 블록으로 출력
                            imageTitle: { // 설정 서비스 경우 사용자의 프로필을 첫번째로 출력
                                "title": `현재 성결대학교 날씨: ${statWeather.state}`,
                                "imageUrl": `${statWeather.icon}`
                            },
                            title: '[알림]',
                            itemList: itemList,
                            description: '1시간 간격으로 날씨 정보를 변경하여 안내하고 있습니다.'
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