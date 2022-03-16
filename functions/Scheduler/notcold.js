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
        const body = {
            userRequest: {
                "utterance": "면 종류 메뉴 알려줘"
            }
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
            .catch(e => {
                console.error('Errof from notcold bus : ', e);
            });
        await axios
            .post(
                'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/middleWare/schoolC' +
                        'afe/schoolCafe_service',
                {body}
            )
            .then(result => {
                console.log(result.status);
            })
            .catch(e => {
                console.error('Errof from notcold cafeService : ', e);
            });
        await axios
            .post(
                'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/middleWare/schoolN' +
                        'otice/schoolNotice_service',
                {body}
            )
            .then(result => {
                console.log(result.status);
            })
            .catch(e => {
                console.error('Errof from notcold noticeService : ', e);
            });

        return null;
    });