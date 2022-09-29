const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
admin.initializeApp();
const app = express();

const schoolBus = require('./router/school-bus');
const schoolNumber = require('./router/school-number');
const schoolLibrary = require('./router/school-library');
const schoolCafe = require('./router/school-cafe/hub');
const cafeService = require('./router/school-cafe/service');
const schoolNotice = require('./router/school-notice/hub');
const noticeService = require('./router/school-notice/service');
const schoolWeather = require('./router/school-weather');
const schoolWifi = require('./router/school-wifi/hub');
const wifiService = require('./router/school-wifi/service');

const bus = require('./crawling/bus');
const number = require('./crawling/number');
const library = require('./crawling/library');
const cafe = require('./crawling/cafe');
const notice = require('./crawling/notice');
const weather = require('./crawling/weather');
const notcold = require('./notcold');

app.use(express.json()); // 모든 입력&출력은 JSON 포맷으로
app.use(cors()); // cors 설정
/* 서비스 선택 관련 미들웨어/컨트롤러 */
app.use('/school-bus', schoolBus);
app.use('/school-number', schoolNumber);
app.use('/school-library', schoolLibrary);
app.use('/school-cafe', schoolCafe);
app.use('/school-cafe/service', cafeService);
app.use('/school-notice', schoolNotice);
app.use('/school-notice/service', noticeService);
app.use('/school-weather', schoolWeather);
app.use('/school-wifi', schoolWifi);
app.use('/school-wifi/service', wifiService);
exports.middleWare = functions
    .region('asia-northeast1')
    .https
    .onRequest(app);

/* 크롤링 미들웨어 */
exports.bus = bus.bus;
exports.number = number.number;
exports.library = library.library;
exports.cafe = cafe.cafe;
exports.notice = notice.notice;
exports.weather = weather.weather;
exports.notcold = notcold.notcold; // Cold Start 이슈 해결을 위한 모듈

process.env.NODE_ENV = (
    process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production'
)
    ? 'production'
    : 'development'; // 개발/배포 모드 구분을 위한 환경변수 지정