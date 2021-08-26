const functions = require('firebase-functions');
const axios = require('axios');

exports.busTrigger = functions
    .region('asia-northeast1')
    .pubsub
    .schedule('0 0 * * *')
    .timeZone('Asia/Seoul')
    .onRun(async () => {
        try {
            return await axios.get(
                'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/bus'
            );
        } catch (error) {
            console.log(error);
        }
    });

exports.numberTrigger = functions
    .region('asia-northeast1')
    .pubsub
    .schedule('0 1 * * *')
    .timeZone('Asia/Seoul')
    .onRun(async () => {
        try {
            return await axios.get(
                'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/number'
            );
        } catch (error) {
            console.log(error);
        }
    });

exports.cafeTrigger = functions
    .region('asia-northeast1')
    .pubsub
    .schedule('0 2 * * *')
    .timeZone('Asia/Seoul')
    .onRun(async () => {
        try {
            return await axios.get(
                'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/cafe'
            );
        } catch (error) {
            console.log(error);
        }
    });

exports.noticeTrigger = functions
    .region('asia-northeast1')
    .pubsub
    .schedule('0 * * * *')
    .timeZone('Asia/Seoul')
    .onRun(async () => {
        try {
            return await axios.get(
                'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/notice'
            );
        } catch (error) {
            console.log(error);
        }
    });