const functions = require('firebase-functions');
const axios = require('axios');

exports.notcold = functions
    .region('asia-northeast1')
    .pubsub
    .schedule('*/5 * * * *')
    .timeZone('Asia/Seoul')
    .onRun((req, res) => {
        const cold_normal = async () => {
            const userRequest = {
                user: {
                    "properties": {
                        "isFriend": false
                    }
                }
            };
            return await axios.post(
                'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/middleWare/schoolB' +
                        'us',
                userRequest
            );
        };
        const colde_cafe = async () => {
            const body = {
                userRequest: {
                    "utterance": "면 종류 메뉴 알려줘"
                }
            };
            return await axios.post(
                'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/middleWare/schoolC' +
                        'afe/schoolCafe_service',
                body
            )
        };
        const cold_notice = async () => {
            const body = {
                userRequest: {
                    "utterance": "학사 관련해서 알려줘"
                }
            };
            return await axios.post(
                'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/middleWare/schoolN' +
                        'otice/schoolNotice_service',
                body
            )
        };

        cold_normal()
            .then(result => {
                console.log('cold_normal:', result.status);
                res.send(200);
            })
            .catch(e => {
                console.error('cold_normal break was fail...:', e);
                res.send(e.status);
            });
        colde_cafe()
            .then(result => {
                console.log('cold_cafe:', result.status);
                res.send(200);
            })
            .catch(e => {
                console.error('cold_cafe break was fail...:', e);
                res.send(e.status);
            });
        cold_notice()
            .then(result => {
                console.log('cold_notice:', result.status);
                res.send(200);
            })
            .catch(e => {
                console.error('cold_notice break was fail...:', e);
                res.send(e.status);
            });
    });