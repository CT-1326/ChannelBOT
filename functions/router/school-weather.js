const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/', async function (req, res) {
    /* 사용자의 카카오 채널 추가 상태를 획인해 데이터 혹은 경고문 출력 */
    const userFriend = req.body.userRequest.user.properties.isFriend; 
    // console.log(userFriend);
    let responseBody;
    const title = ['현재 온도', '체감 온도', '최고 기온', '최저 기온'];
    const description = [];
    let itemList = [];

    if (userFriend === true) {
        /* 날씨 그리고 온도 상태 데이터를 각각 아이템 카드 뷰 블록 본문으로 작성 및 해당 구조로 출력 */
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
                        itemCard: { 
                            imageTitle: {
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