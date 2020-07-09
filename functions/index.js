const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express');
const cors = require('cors');

const sb = require('./Router/school_bus');
const sn = require('./Router/school_number');
const ls = require('./Router/library_state');
const snoti = require('./Router/Notice/school_notice');
// const snoti2 = require('./Router/Notice/school_notice2');
// const snoti3 = require('./Router/Notice/school_notice3');
// const snoti4 = require('./Router/Notice/school_notice4');
// const snoti5 = require('./Router/Notice/school_notice5');
// const snoti6 = require('./Router/Notice/school_notice6');
// const snoti7 = require('./Router/Notice/school_notice7');
// const snoti8 = require('./Router/Notice/school_notice8');
const bab = require('./Router/Cafe/Bab');
const fry = require('./Router/Cafe/Fry');
const noodles = require('./Router/Cafe/Noodles');

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
app.use('/ls', ls);
app.use('/snoti', snoti);
// app.use('/snoti2', snoti2);
// app.use('/snoti3', snoti3);
// app.use('/snoti4', snoti4);
// app.use('/snoti5', snoti5);
// app.use('/snoti6', snoti6);
// app.use('/snoti7', snoti7);
// app.use('/snoti8', snoti8);
app.use('/bab', bab);
app.use('/fry', fry);
app.use('/noodles', noodles);

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