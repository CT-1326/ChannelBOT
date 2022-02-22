const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express');
const cors = require('cors');
admin.initializeApp();
const app = express();

const schoolBus = require('./Router/school_bus');
const schoolNumber = require('./Router/school_number');
const libraryState = require('./Router/library_state');
const schoolCafe = require('./Router/school_cafe/school_cafe');
const cafeService = require('./Router/school_cafe/cafe_service');
const schoolNotice = require('./Router/school_notice/school_notice');
const noticeService = require('./Router/school_notice/notice_service');

const bus = require('./Crawling/bus');
const number = require('./Crawling/number');
const library = require('./Crawling/library');
const cafe = require('./Crawling/cafe');
const notice = require('./Crawling/notice');

const notcold = require('./Scheduler/notcold');

app.use(cors());
app.use('/schoolBus', schoolBus);
app.use('/schoolNumber', schoolNumber);
app.use('/libraryState', libraryState);
app.use('/schoolCafe', schoolCafe);
app.use('/schoolCafe/schoolCafe_service', cafeService);
app.use('/schoolNotice', schoolNotice);
app.use('/schoolNotice/schoolNotice_service', noticeService);
exports.middleWare = functions
    .region('asia-northeast1')
    .https
    .onRequest(app);

exports.bus = bus.bus;
exports.number = number.number;
exports.library = library.library;
exports.cafe = cafe.cafe;
exports.notice = notice.notice;

exports.notcold = notcold.notcold;