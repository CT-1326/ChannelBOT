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

app.use(cors()); // cors 설정
app.use('/school-bus', schoolBus); // 셔틀버스 안내
app.use('/school-number', schoolNumber); // 학교번호 안내
app.use('/school-library', schoolLibrary); // 학술정보관 좌석 현황 안내
app.use('/school-cafe', schoolCafe); // 오늘의 학식 안내 메뉴 선택
app.use('/school-cafe/service', cafeService); // 오늘의 학식 안내
app.use('/school-notice', schoolNotice); // 학교 공지사항 안내 메뉴 선택
app.use('/school-notice/service', noticeService); // 학교 공지사항 안내
app.use('/school-weather', schoolWeather); // 현재 학교 날씨 안내
app.use('/school-wifi', schoolWifi); // 학교 WIFI 연결 안내 메뉴 선택
app.use('/school-wifi/service', wifiService); // 학교 WIFI 연결 안내
exports.middleWare = functions
    .region('asia-northeast1')
    .https
    .onRequest(app); // ChannelBOT 기본 주소 미들웨어

exports.bus = bus.bus; // 셔틀버스 크롤링 미들웨어
exports.number = number.number; // 대표번호 크롤링 미들웨어
exports.library = library.library; // 학술정보관 열람실 크롤링 미들웨어
exports.cafe = cafe.cafe; // 학식 크롤링 미들웨어
exports.notice = notice.notice; // 학교 게시판 크롤링 미들웨어
exports.weather = weather.weather; // 학교 날씨 조회 미들웨어
exports.notcold = notcold.notcold; // cold start 이슈 개선의 미들웨어