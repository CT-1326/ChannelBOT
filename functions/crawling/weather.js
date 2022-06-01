const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require("axios");

exports.weather = functions // 함수 이름
    .region('asia-northeast1')
    .https
    .onRequest((req, res) => {
        /* openweather API 요청*/
        let config = {
            method: 'get',
            url: `https://api.openweathermap.org/data/2.5/weather?lat=37.38&lon=126.927&lang=kr&appid=${functions
                .config()
                .api_key
                .weather}`,
            headers: {}
        };

        axios(config)
            .then(async (response) => {
                const result = response.data; // 요청 결과 값 변수 처리
                // console.log(result);
                /* 날씨 데이터(상태,아이콘,온도)를 DB에 저장*/
                await admin
                    .database()
                    .ref('School_Weather')
                    .set({
                        weather: {
                            state: `${result
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
                    });
                // const resultData = {
                //     weather: {
                //         state: `${result
                //             .weather[0]
                //             .description}`,
                //         icon: `http://openweathermap.org/img/w/${result
                //             .weather[0]
                //             .icon}.png`
                //     },
                //     main: {
                //         temp: `${result.main.temp}`,
                //         feels: `${result.main.feels_like}`,
                //         temp_min: `${result.main.temp_min}`,
                //         temp_max: `${result.main.temp_max}`
                //     }
                // };
                // res
                //     .status(201)
                //     .send(resultData);
                res.sendStatus(201); // 성공 코드 전송
                console.log('School Weather DB input success');
            })
            .catch(function (err) {
                console.error('Error from weather:', err);
                res.sendStatus(err.response.status); // 에러 코드 전송
            });

    });