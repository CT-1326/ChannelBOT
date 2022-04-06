const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require("axios");

exports.weather = functions // 함수 이름
    .region('asia-northeast1')
    .https
    .onRequest((req, res) => {
        /*openweather API 요청*/
        let config = {
            method: 'get',
            url: `https://api.openweathermap.org/data/2.5/weather?lat=37.38&lon=126.927&lang=kr&appid=${functions
                .config()
                .service_key
                .weather}`,
            headers: {}
        };

        axios(config)
            .then(async (response) => {
                const result = response.data; // 요청 결과 값 변수 처리
                // console.log(result);
                /* 날씨 데이터(조건,아이콘,온도)를 DB에 저장*/
                await admin
                    .database()
                    .ref('Scool_Weather')
                    .set({
                        weather: {
                            stat: `${result
                                .weather[0]
                                .description}`,
                            icon: `http://openweathermap.org/img/w/${result
                                .weather[0]
                                .icon}.png`
                        },
                        main: {
                            temp: `${result.main.temp}`,
                            feels: `${result.main.feels_like}`,
                            temp_min: `${result.main.temp_min}`,
                            temp_max: `${result.main.temp_max}`
                        }
                    })
                res.sendStatus(201); // 성공 코드 전송
                console.log('School Weather DB input success');
            })
            .catch(function (error) {
                console.error('Error from weather:', error);
                res.sendStatus(error.response.status); // 에러 코드 전송
            });

    });