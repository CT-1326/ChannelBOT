const functions = require('firebase-functions');
const admin = require('firebase-admin');
const puppeteer = require('puppeteer');

const op = {
    timeoutSeconds: 60,
    memory: '512MB'
}; // puppteer를 쓰기 위한 HTTP functions 옵션 값 set

exports.number = functions // 크롤링 함수 이름
    .runWith(op)
    .region('asia-northeast1')
    .https
    .onRequest(async (req, res) => {
        try {
            const browser = await puppeteer.launch({
                args: [
                    '--no-sandbox', '--disable-setuid-sandbox', '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHT' +
                            'ML, like Gecko) Chrome/86.0.4240.111 Safari/537.36'
                ]
            }); // Firebase cli 환경에서 돌아가기 위한 조건 설정
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
            await page.goto('https://everytime.kr/login', {waitUntil: "domcontentloaded"}); // 에타 로그인
            /* id, password 입력*/
            await page.evaluate((id, pw) => {
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
            /* 번호 관련 페이지로 이동*/
            await page.goto(
                'https://everytime.kr/389111/v/79312283',
                {waitUntil: "domcontentloaded"}
            );
            /* 추출하고자 하는 DOM 내용 추출 및 저장*/
            await page.waitForSelector('#container > div.wrap.articles > article > a > p');
            let result = await page.$eval(
                '#container > div.wrap.articles > article > a > p',
                // eslint-disable-next-line id-length
                e => e.outerText
            );
            // console.log(result);
            await browser.close(); // puppteer 종료

            const addData = '시설관재과: 031 467 8257\n[각종 교내 시설 관리 관련 문의]\n\n#';
            result = result.replace('#',addData);
            console.log(result);
            admin
                .database()
                .ref('School_Number')
                .set({info: result}); // DB에 추출 값 저장
            // res
            //     .status(201)
            //     .send(result);
            res.sendStatus(201); // 성공 코드 전송
        } catch (err) {
            console.error('Error from crawling number:', err);
            res.sendStatus(err.response.status); // 에러 코드 전송
        }

    });