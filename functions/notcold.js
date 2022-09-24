const functions = require('firebase-functions');
const axios = require('axios');

exports.notcold = functions
    .region('asia-northeast1')
    .pubsub
    .schedule('*/3 * * * *')
    .timeZone('Asia/Seoul')
    .onRun(() => {
        function busCold() {
            const data = JSON.stringify({
                "userRequest": {
                    "user": {
                        "properties": {
                            "isFriend": true // 카카오 채널 친구 추가 상태 명시
                        }
                    }
                }
            });

            const config = {
                method: 'post',
                url: 'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/middleWare/school-bus',
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
                    "user": {
                        "properties": {
                            "isFriend": true
                        }
                    }
                }
            });

            const config = {
                method: 'post',
                url: 'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/middleWare/school-cafe',
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
                    "user": {
                        "properties": {
                            "isFriend": true
                        }
                    }
                }
            });

            const config = {
                method: 'post',
                url: 'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/middleWare/school-notice',
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

        /* 순차적으로 3분 단위로 함수 호출 */
        axios
            .all([busCold(), cafeCold(), noticeCold()])
            .then(axios.spread(() => {
                console.log('Break!');
            }));
        return null;
    });