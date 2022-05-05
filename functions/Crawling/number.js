const functions = require('firebase-functions');
const admin = require('firebase-admin');
const puppeteer = require('puppeteer');

const op = {
    timeoutSeconds: 60,
    memory: '512MB'
}; //puppteer를 쓰기 위한 HTTP functions 옵션 값 set

exports.number = functions //크롤링 함수 이름
    .runWith(op)
    .region('asia-northeast1')
    .https
    .onRequest((req, res) => {
        const getData = async () => {
            const browser = await puppeteer.launch({
                args: [
                    '--no-sandbox', '--disable-setuid-sandbox', '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHT' +
                            'ML, like Gecko) Chrome/86.0.4240.111 Safari/537.36'
                ]
            }); //Firebase cli 환경에서 돌아가기 위한 조건 설정
            const page = await browser.newPage();
            await page.setDefaultNavigationTimeout(0);
            const ID = functions
                .config()
                .number
                .id;
            const PW = functions
                .config()
                .number
                .pw;
            await page.goto('https://everytime.kr/login', {waitUntil: "domcontentloaded"}); //에타 로그인
            await page.evaluate((id, pw) => { //id, password 입력
                document
                    .querySelector('#container > form > p:nth-child(1) > input')
                    .value = id;
                document
                    .querySelector('#container > form > p:nth-child(2) > input')
                    .value = pw;
                document
                    .querySelector('#container > form > p.submit > input')
                    .click();
            }, ID, PW);
            console.log('login success');
            await page.waitForNavigation();
            await page.goto(
                'https://everytime.kr/389111/v/79312283',
                {waitUntil: "domcontentloaded"}
            );
            await page.waitForSelector('#container > div.wrap.articles > article > a > p');
            const info = await page.$eval(
                '#container > div.wrap.articles > article > a > p',
                //eslint-disable-next-line id-length
                e => e.outerText
            ); //본문 텍스트 추출 및 저장
            await browser.close();
            return info; //추출 값 반환
        };
        getData()
            .then(result => {
                console.log(result);
                admin
                    .database()
                    .ref('School_Number')
                    .set({info: result}); //DB에 추출 값 저장
                res.sendStatus(201); //성공 코드 전송
                console.log('School Number DB input success');
            })
            .catch(error => {
                console.error('Error from crawling number:', error);
                res.sendStatus(error.response.status); //에러 코드 전송
            });
    });