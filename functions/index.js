const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
admin.initializeApp();
const app = express();

const schoolBus = require('./router/school_bus');
const schoolNumber = require('./router/school_number');
const schoolLibrary = require('./router/school_library');
const schoolCafe = require('./router/school_cafe/school_cafe');
const cafeService = require('./router/school_cafe/cafe_service');
const schoolNotice = require('./router/school_notice/school_notice');
const noticeService = require('./router/school_notice/notice_service');
const schoolWeather = require('./router/school_weather');
const schoolWifi = require('./router/school_wifi/school_wifi');
const wifiService = require('./router/school_wifi/wifi_service');

const bus = require('./crawling/bus');
const number = require('./crawling/number');
const library = require('./crawling/library');
const cafe = require('./crawling/cafe');
const notice = require('./crawling/notice');
const notcold = require('./scheduler/notcold');
const weather = require('./scheduler/weather');

app.use(cors());
app.use('/schoolBus', schoolBus);
app.use('/schoolNumber', schoolNumber);
app.use('/schoolLibrary', schoolLibrary);
app.use('/schoolCafe', schoolCafe);
app.use('/schoolCafe/schoolCafe_service', cafeService);
app.use('/schoolNotice', schoolNotice);
app.use('/schoolNotice/schoolNotice_service', noticeService);
app.use('/schoolWeather', schoolWeather);
app.use('/schoolWifi', schoolWifi);
app.use('/schoolWifi/schoolWifi_service', wifiService);
exports.middleWare = functions
    .region('asia-northeast1')
    .https
    .onRequest(app); //채널봇 기본 주소 미들웨어

exports.bus = bus.bus; //셔틀버스 크롤링 미들웨어
exports.number = number.number; //대표번호 크롤링 미들웨어
exports.library = library.library; //학술정보관 열람실 크롤링 미들웨어
exports.cafe = cafe.cafe; //학식 크롤링 미들웨어
exports.notice = notice.notice; //학교 게시판 크롤링 미들웨어
exports.notcold = notcold.notcold; //cold start 이슈 개선의 미들웨어
exports.weather = weather.weather; //학교 날씨 조회 미들웨어