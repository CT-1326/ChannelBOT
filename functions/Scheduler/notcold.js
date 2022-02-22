const functions = require('firebase-functions');
const axios = require('axios');

exports.notcold = functions
    .region('asia-northeast1')
    .pubsub
    .schedule('*/5 * * * *')
    .timeZone('Asia/Seoul')
    .onRun(() => {
        const cold_normal = async () => {
            try {
                return await axios.post(
                    'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/middleWare/schoolB' +
                    'us'
                );
            } catch (error) {
                console.error('cold_normal break was fail...:', error);
            }
        };
        const colde_cafe = async () => {
            try {
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
            } catch (error) {
                console.error('cold_cafe break was fail...:', error);
            }
        };
        const cold_notice = async () => {
            try {
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
            } catch (error) {
                console.error('cold_notice break was fail...:', error);
            }
        };
        
        cold_normal();
        colde_cafe();
        cold_notice();
    });