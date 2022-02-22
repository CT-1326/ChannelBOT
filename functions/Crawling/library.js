const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const cheerio = require('cheerio');

exports.library = functions
    .region('asia-northeast1')
    .pubsub
    .schedule('* * * * 1-5')
    .timeZone('Asia/Seoul')
    .onRun(() => {
        axios
            .get('https://clicker.sungkyul.ac.kr/Clicker/k')
            .then(html => {
                const $ = cheerio.load(html.data);
                const max_laptop = $(
                    '#table_board_list > tbody > tr:nth-child(1) > td:nth-child(2)'
                )
                    .text()
                    .replace(/\s/g, '');
                const now_laptop = $('#clicker_ajax_room_status_absent_20150629114729638')
                    .text()
                    .replace(/\s/g, '');
                const max_normal = $(
                    '#table_board_list > tbody > tr:nth-child(2) > td:nth-child(2)'
                )
                    .text()
                    .replace(/\s/g, '');
                const now_normal = $('#clicker_ajax_room_status_absent_20150629114747516')
                    .text()
                    .replace(/\s/g, '');
                const result = new Array();
                result[0] = now_laptop + '/' + max_laptop;
                result[1] = now_normal + '/' + max_normal;
                return result;
            })
            .then(res => {
                console.log(res);
                admin
                    .database()
                    .ref('Library_State/1f_laptop')
                    .set({state: res[0]});
                admin
                    .database()
                    .ref('Library_State/1f_normal')
                    .set({state: res[1]});
            })
            .catch(e => {
                console.error('Error from crawling library:', e);
            })
        });