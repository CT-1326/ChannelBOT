const functions = require('firebase-functions');
const axios = require('axios');

exports.notcold = functions // 함수 이름
    .region('asia-northeast1')
    .pubsub
    .schedule('*/3 * * * *') // 3분 단위로 실행
    .timeZone('Asia/Seoul')
    .onRun(() => {
        function busCold() {
            const data = JSON.stringify({
                "userRequest": {
                    "user": {
                        "properties": {
                            "isFriend": true
                        }
                    }
                }
            });

            const config = {
                method: 'post',
                url: 'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/middleWare/school-' +
                        'bus',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            return axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.error('Error from busCold : ', error);
                });
        }

        function cafeCold() {
            const data = JSON.stringify({
                "userRequest": {
                    "utterance": "면 종류 메뉴 알려줘"
                }
            });

            const config = {
                method: 'post',
                url: 'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/middleWare/school-' +
                        'cafe/service',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.error('Error from cafeCold : ', error);
                });
        }

        function noticeCold() {
            const data = JSON.stringify({
                "userRequest": {
                    "utterance": "학사 관련해서 알려줘"
                }
            });

            const config = {
                method: 'post',
                url: 'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/middleWare/school-' +
                        'notice/service',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.error('Error from noticeCold : ', error);
                });
        }

        axios
            .all([busCold(), cafeCold(), noticeCold()])
            .then(axios.spread(() => {
                console.log('Break!');
            }));
        return null;
    });