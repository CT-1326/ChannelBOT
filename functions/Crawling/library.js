const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const cheerio = require('cheerio');

exports.library = functions //크롤링 함수 이름
    .region('asia-northeast1')
    .pubsub
    .schedule('* * * * 1-5') //평일에 1분단위로 실행
    .timeZone('Asia/Seoul')
    .onRun(() => {
        axios
            .get('https://clicker.sungkyul.ac.kr/Clicker/k') //열람실 좌석 안내 페이지 주소
            .then(async (html) => {
                //eslint-disable-next-line id-length
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
                /*일반 열람실 총 좌석과 현재 좌석 텍스트 값 추출*/
                const max_normal = $(
                    '#table_board_list > tbody > tr:nth-child(2) > td:nth-child(2)'
                )
                    .text()
                    .replace(/\s/g, '');
                const now_normal = $('#clicker_ajax_room_status_absent_20150629114747516')
                    .text()
                    .replace(/\s/g, '');
                /*각 열람실의 추출 값을 배열에 저장*/
                const result = new Array();
                result.push(now_laptop + '/' + max_laptop);
                result.push(now_normal + '/' + max_normal);
                
                /*노트북 그리고 일반 열람실 관련 배열 데이터를 각각 DB key 값으로 저장*/
                await admin
                    .database()
                    .ref('Library_State/')
                    .set({
                        laptop: {
                            state: result[0]
                        },
                        normal: {
                            state: result[1]
                        }
                    });
                //res.status(201).send(result);
            })
            .catch(error => {
                console.error('Error from crawling library:', error);
            });
        return null;
    });