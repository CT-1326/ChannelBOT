const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const sb = require('./Router/school_bus');
const sn = require('./Router/school_number');
const ls = require('./Router/library_state');
const sc = require('./Router/school_cafe');
const snoti = require('./Router/school_notice');
const noti_hub = require('./Router/notice_hub');
const cafe_hub = require('./Router/cafe_hub');

const bus = require('./Crawling/bus');
const number = require('./Crawling/number');
const library = require('./Crawling/library');
const cafe = require('./Crawling/cafe');
const notice = require('./Crawling/notice');

admin.initializeApp();

const app = express();
app.use(cors());
app.use('/sb', sb);
app.use('/sn', sn);
app.use('/sc', sc);
app.use('/ls', ls);
app.use('/snoti', snoti);

exports.helloWorld = functions
    .region('asia-northeast1')
    .https
    .onRequest(app);

exports.bus = bus.bus;
exports.number = number.number;
exports.library = library.library;
exports.cafe = cafe.cafe;
exports.notice = notice.notice;
exports.noti_hub = noti_hub.noti_hub;
exports.cafe_hub = cafe_hub.cafe_hub;

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
                    console.log(error);
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
                    console.log(error);
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
                    console.log(error);
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