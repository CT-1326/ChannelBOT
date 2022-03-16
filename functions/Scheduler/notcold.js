const functions = require('firebase-functions');
const axios = require('axios');

exports.notcold = functions
    .region('asia-northeast1')
    .pubsub
    .schedule('*/5 * * * *')
    .timeZone('Asia/Seoul')
    .onRun(async () => {
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": false
                }
            }
        };
        const data = JSON.stringify({
            "userRequest": {
                "utterance": "면 종류 메뉴 알려줘"
            }
        });
        const data2 = JSON.stringify({
            "userRequest": {
                "utterance": "학사 관련해서 알려줘"
            }
        });
        const config = {
            method: 'post',
            url: 'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/middleWare/schoolC' +
                    'afe/schoolCafe_service',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': '__Host-GAPS=1:23ae_DitgsPMuGttitn9FgkTTIDD8Q:zy22LzBdrhMCLSeb'
            },
            data: data
        };
        const config2 = {
            method: 'post',
            url: 'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/middleWare/schoolN' +
                    'otice/schoolNotice_service',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': '__Host-GAPS=1:23ae_DitgsPMuGttitn9FgkTTIDD8Q:zy22LzBdrhMCLSeb'
            },
            data: data2
        };

        await axios
            .post(
                'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/middleWare/schoolB' +
                        'us',
                {userRequest}
            )
            .then(result => {
                console.log(result.status);
            })
            .catch(error => {
                console.error('Error from notcold bus : ', error);
            });
        await axios(config)
            .then(result => {
                console.log(result.status);
            })
            .catch(function (error) {
                console.log('Error from notcold cafe : ', error);
            });
        await axios(config2)
            .then(result => {
                console.log(result.status);
            })
            .catch(function (error) {
                console.log('Error from notcold notice : ', error);
            });

        return null;
    });