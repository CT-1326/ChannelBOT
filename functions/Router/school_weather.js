const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/', async function (req, res) {
    const userFriend = req.body.userRequest.user.properties.isFriend; // 사용자 카카오 채널 정보
    // console.log(userFriend);
    let responseBody;
    const title = ['현재 온도', '체감 온도', '오늘 최고기온', '오늘 최저기온'];
    const description = [];
    let itemList = [];

    if (userFriend == true) { // 채널을 추가한 사용자인 경우
        /*온도 그리고 기상 조건 데이터를 각각 변수처리*/
        const mainWeather = await admin
            .database()
            .ref('School_Weather/')
            .child('main')
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch((e) => {
                console.error(e);
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
            .catch((e) => {
                console.error(e);
            });
        // console.log(statWeather);
        /* 아이템 카드 뷰 본문 작성*/
        description.push(
            mainWeather.temp,
            mainWeather.feels,
            mainWeather.temp_max,
            mainWeather.temp_min
        );
        title.forEach((value, index) => {
            itemList.push({"title": value, "description": description[index]});
        });
        // console.log(itemList);
        responseBody = {
            version: "2.0",
            template: {
                outputs: [
                    {
                        itemCard: { // 아이템 카드 뷰 블록으로 출력
                            thumbnail: {
                                "imageUrl": `${statWeather.icon}`,
                                "width": 800,
                                "height": 800
                            },
                            title: '[현재 셩결대학교의 날씨]',
                            itemList: itemList,
                            description: '한 시간 간격으로 날씨 정보를 변경하여 안내되고 있습니다.'
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