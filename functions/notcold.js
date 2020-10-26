const functions = require('firebase-functions');
const axios = require('axios');

exports.notcold = functions
    .region('asia-northeast1')
    .pubsub
    .schedule('*/5 * * * *')
    .timeZone('Asia/Seoul')
    .onRun(async () => {
        try {
            const cold_normal = async () => {
                try {
                    return await axios.get(
                        'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/helloWorld/sb'
                    );
                } catch (error) {
                    console.log('cold break was fail...:', error);
                }
            };
            const cold_notice = async () => {
                try {
                    const body = {
                        "userRequest": {
                            "utterance": "학사 관련해서 알려줘"
                        }
                    };
                    return await axios.post(
                        'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/noti_hub',
                        body
                    )
                } catch (error) {
                    console.log('cold break was fail...:', error);
                }
            }
            const colde_cafe = async () => {
                try {
                    const body = {
                        "userRequest": {
                            "utterance": "면 종류 메뉴 알려줘"
                        }
                    };
                    return await axios.post(
                        'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/cafe_hub',
                        body
                    )
                } catch (error) {
                    console.log('cold break was fail...:', error);
                }
            }
            cold_normal();
            cold_notice();
            colde_cafe();
            return null;
        } catch (error) {
            console.log('WTF : ', error);
        }
    });