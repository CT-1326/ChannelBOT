const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express');
const cors = require('cors');

const sb = require('./Router/school_bus');
const sn = require('./Router/school_number');
const ls = require('./Router/library_state');
const ci = require('./Router/cafe_info');
const snoti = require('./Router/school_notice');

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
app.use('/ci', ci);
app.use('/ls', ls);
app.use('/snoti', snoti);

exports.helloWorld = functions
    .region('asia-northeast1')
    .https
    .onRequest(app);

exports.bus = bus.bus;
exports.number = number.number;
exports.library_schedul = library.scheduledFunction;
exports.library = library.library;
exports.cafe = cafe.cafe;
exports.notice = notice.notice;