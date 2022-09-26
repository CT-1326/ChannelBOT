const functions = require('firebase-functions');
const admin = require('firebase-admin');
const puppeteer = require('puppeteer');

const op = {
    timeoutSeconds: 60,
    memory: '512MB'
}; // puppeteer 사용에 필요한 functions 최소 옵션 값

exports.number = functions
    .runWith(op)
    .region('asia-northeast1')
    .https
    .onRequest(async (req, res) => {
        if (req.body.admin === functions.config().api_key.admin) {
            try {
                const browser = await puppeteer.launch({
                    args: [
                        '--no-sandbox', '--disable-setuid-sandbox', '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHT' +
                                'ML, like Gecko) Chrome/86.0.4240.111 Safari/537.36'
                    ]
                }); // Firebase cli 작동 환경 또한, 봇이 아님을 지정하는 헤더 작성
                const page = await browser.newPage();
                await page.setDefaultNavigationTimeout(0);
                /* Firebase 환경변수를 통해 id, pw 값 작성 및 로그인 시도*/
                const ID = functions
                    .config()
                    .number
                    .id;
                const PW = functions
                    .config()
                    .number
                    .pw;
                await page.goto('https://everytime.kr/login', {waitUntil: "domcontentloaded"});
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
                /* 학교 번호 페이지로 이동 후 관련 DOM 추출 및 DB에 저장*/
                await page.goto(
                    'https://everytime.kr/389111/v/79312283',
                    {waitUntil: "domcontentloaded"}
                );
                await page.waitForSelector('#container > div.wrap.articles > article > a > p');
                let result = await page.$eval(
                    '#container > div.wrap.articles > article > a > p',
                    // eslint-disable-next-line id-length
                    e => e.outerText
                );
                // console.log(result);
                await browser.close();

                const addData = '시설관재과: 031 467 8257\n[각종 교내 시설 관리 관련 문의]\n\n#'; // 피드백 받은 추가 내용 작성
                result = result.replace('#', addData);
                console.log(result);
                admin
                    .database()
                    .ref('School_Number')
                    .set({info: result});

                /* 개발 모드에는 mocha 테스트 코드 실행을 위해 결과 값을 함께 전송 */
                /* 배포 모드에는 결과 코드만 전송 */
                if (process.env.NODE_ENV === 'development') {
                    res
                        .status(201)
                        .send(result);
                } else {
                    res.sendStatus(201);
                }
                console.log('School Number DB input success');
            } catch (err) {
                console.error('Error from crawling number:', err);
                res.sendStatus(err.response.status);
            }
        } else {
            console.error('No have key');
            res.sendStatus(400);
        }

    });