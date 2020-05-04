const functions = require('firebase-functions');
const admin = require('firebase-admin');
const puppeteer = require('puppeteer');
const axios = require('axios');

const op = {
    timeoutSeconds: 60,
    memory: '512MB'
}
exports.library = functions
    .runWith(op)
    .region('asia-northeast1')
    .https
    .onRequest(() => {
        try {
            const getData = async () => {
                const browser = await puppeteer.launch({
                    args: ['--no-sandbox', '--disable-setuid-sandbox']
                });
                const page = await browser.newPage();
                const ID = "20160995";
                const PW = "Apsj1860178*";
                await page.goto('https://clicker.sungkyul.ac.kr/Clicker/LogOnClicker');
                await page.evaluate((id, pw) => {
                    document
                        .querySelector('#textUserId')
                        .value = id;
                    document
                        .querySelector('#textUserPassword')
                        .value = pw;
                }, ID, PW);
                await page.click('#buttonLogin');
                await page.waitForSelector('#table_board_list');
                const max_laptop = await page.$eval(
                    '#table_board_list > tbody > tr:nth-child(1) > td:nth-child(2)',
                    e => e.outerText
                );
                const now_laptop = await page.$eval(
                    '#clicker_ajax_room_status_absent_20150629114729638',
                    e => e.outerText
                );
                const max_normal = await page.$eval(
                    '#table_board_list > tbody > tr:nth-child(2) > td:nth-child(2)',
                    e => e.outerText
                );
                const now_normal = await page.$eval(
                    '#clicker_ajax_room_status_absent_20150629114747516',
                    e => e.outerText
                );
                const info = new Array();
                info[0] = now_laptop + '/' + max_laptop;
                info[1] = now_normal + '/' + max_normal;
                await browser.close();
                return info;
            }
            getData().then(res => {
                console.log(res);
                admin
                    .database()
                    .ref('Library_State/1f_laptop')
                    .set({state: res[0]});
                admin
                    .database()
                    .ref('Library_State/1f_normal')
                    .set({state: res[1]});
                return null;
            });
        } catch (error) {
            console.log('wtf : ', error);
        }
    });

exports.scheduledFunction = functions
    .region('asia-northeast1')
    .pubsub
    .schedule('0 0 * * *')
    .timeZone('Asia/Seoul')
    .onRun(async () => {
        try {
            return await axios.get(
                'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/library'
            );
        } catch (error) {
            console.log(error);
        }
    });