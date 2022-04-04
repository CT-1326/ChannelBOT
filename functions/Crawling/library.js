const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const cheerio = require('cheerio');

exports.library = functions // 크롤링 함수 이름
    .region('asia-northeast1')
    .pubsub
    .schedule('* * * * 1-5') // 평일에 1분단위로 실행
    .timeZone('Asia/Seoul')
    .onRun(() => {
        axios
            .get('https://clicker.sungkyul.ac.kr/Clicker/k') // 열람실 좌석 안내 페이지 주소
            .then(html => {
                const $ = cheerio.load(html.data);
                /*노트북 열람실 총 좌석과 현재 좌석 텍스트 값 추출*/
                const max_laptop = $(
                    '#table_board_list > tbody > tr:nth-child(1) > td:nth-child(2)'
                )
                    .text()
                    .replace(/\s/g, '');
                const now_laptop = $('#clicker_ajax_room_status_absent_20150629114729638')
                    .text()
                    .replace(/\s/g, '');
                /* 일반 열람실 총 좌석과 현재 좌석 텍스트 값 추출*/
                const max_normal = $(
                    '#table_board_list > tbody > tr:nth-child(2) > td:nth-child(2)'
                )
                    .text()
                    .replace(/\s/g, '');
                const now_normal = $('#clicker_ajax_room_status_absent_20150629114747516')
                    .text()
                    .replace(/\s/g, '');
                /* 각각의 추출 값을 배열에 저장 및 반환*/
                const result = new Array();
                result.push(now_laptop + '/' + max_laptop);
                result.push(now_normal + '/' + max_normal);
                return result;
            })
            .then(result => {
                console.log(result);
                admin
                    .database()
                    .ref('Library_State/1f_laptop')
                    .set({state: result[0]}); // 노트북 열람실 데이터를 DB에 저장
                admin
                    .database()
                    .ref('Library_State/1f_normal')
                    .set({state: result[1]}); // 일반 열람실 데이터를 DB에 저장
            })
            .catch(e => {
                console.error('Error from crawling library:', e);
            });
        return null;
    });