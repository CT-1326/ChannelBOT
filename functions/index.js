const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express');
const cors = require('cors');
admin.initializeApp();
const app = express();

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

const notcold = require('./Scheduler/notcold');

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

exports.notcold = notcold.notcold;