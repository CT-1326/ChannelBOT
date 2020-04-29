const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cheerio = require('cheerio');
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
        const getData = async () => {
            const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
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
            await browser.close();
            return page.url();
        }
        getData().then(html => {
            console.log(html);
            admin
                .database()
                .ref('School_Number/')
                .set({info: html})
        });
    });