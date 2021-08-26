const functions = require('firebase-functions');
const axios = require('axios');

exports.bus = functions
    .region('asia-northeast1')
    .pubsub
    .schedule('* * * * 1-5')
    .timeZone('Asia/Seoul')
    .onRun(async () => {
        try {
            console.log('bus test')
            // return await axios.get(
            //     'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/library'
            // );
        } catch (error) {
            console.log(error);
        }
    });
 
exports.cafe = functions
    .region('asia-northeast1')
    .pubsub
    .schedule('* * * * 1-5')
    .timeZone('Asia/Seoul')
    .onRun(async () => {
        try {
            console.log('cafe test')
            // return await axios.get(
            //     'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/library'
            // );
        } catch (error) {
            console.log(error);
        }
    });

exports.library = functions
    .region('asia-northeast1')
    .pubsub
    .schedule('* * * * 1-5')
    .timeZone('Asia/Seoul')
    .onRun(async () => {
        try {
            console.log('library test')
            // return await axios.get(
            //     'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/library'
            // );
        } catch (error) {
            console.log(error);
        }
    });

exports.notice = functions
    .region('asia-northeast1')
    .pubsub
    .schedule('* * * * 1-5')
    .timeZone('Asia/Seoul')
    .onRun(async () => {
        try {
            console.log('notice test')
            // return await axios.get(
            //     'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/library'
            // );
        } catch (error) {
            console.log(error);
        }
    });

exports.number = functions
    .region('asia-northeast1')
    .pubsub
    .schedule('* * * * 1-5')
    .timeZone('Asia/Seoul')
    .onRun(async () => {
        try {
            console.log('number test')
            // return await axios.get(
            //     'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/library'
            // );
        } catch (error) {
            console.log(error);
        }
    });