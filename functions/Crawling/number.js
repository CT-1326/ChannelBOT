const functions = require('firebase-functions');
const admin = require('firebase-admin');
const puppeteer = require('puppeteer');

const op = {
    timeoutSeconds: 60,
    memory: '512MB'
}
exports.scheduledFunction = functions
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
                const ID = "smw7567";
                const PW = "Apsj1860178*";
                await page.goto('https://everytime.kr/login');
                await page.evaluate((id, pw) => {
                    document
                        .querySelector('#container > form > p:nth-child(1) > input')
                        .value = id;
                    document
                        .querySelector('#container > form > p:nth-child(2) > input')
                        .value = pw;
                }, ID, PW);
                await page.click('#container > form > p.submit > input');
                await page.goto('https://everytime.kr/389111/v/79312283');
                await page.waitForSelector('#container > div.wrap.articles > article > a > p');
                const info = await page.$eval(
                    '#container > div.wrap.articles > article > a > p',
                    e => e.outerText
                );
                await browser.close();
                return info;
            }
            getData().then(res => {
                console.log(res);
                admin
                    .database()
                    .ref('School_Number')
                    .set({info: res});
                return null;
            });
        } catch (error) {
            console.log('wtf : ', error);
        }
    });