const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require("axios");

exports.weather = functions
    .region('asia-northeast1')
    .https
    .onRequest((req, res) => {
        /* 어드민 인증 key 값이 있는지 요청 상태 인지를 확인해 크롤링 실행 혹은 미실행 */
        if (req.body.admin === functions.config().api_key.admin) {
            /* 학교 위치 좌표 값을 토대로 openweather API 요청*/
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
                    const result = response.data;
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
                    /* 개발 모드에는 mocha 테스트 코드 실행을 위해 결과 값을 함께 전송 */
                    /* 배포 모드에는 결과 코드만 전송 */
                    if (process.env.NODE_ENV === 'development') {
                        const resultData = {
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
                        };
                        res
                            .status(201)
                            .send(resultData);
                    } else {
                        res.sendStatus(201);
                    }
                    console.log('School Weather DB input success');
                })
                .catch(function (err) {
                    console.error('Error from weather:', err);
                    res.sendStatus(err.response.status);
                });
        } else {
            console.error('No have key');
            res.sendStatus(400);
        }
    });