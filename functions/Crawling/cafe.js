const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require("axios");
const cheerio = require("cheerio");

exports.cafe = functions //크롤링 함수 이름
    .region('asia-northeast1')
    .https
    .onRequest((req, res) => {
        axios
            .get('https://www.sungkyul.ac.kr/skukr/340/subview.do') //학식 안내 페이지 주소
            .then(async (html) => {
                //eslint-disable-next-line id-length
                const $ = cheerio.load(html.data);
                /*학식당 소개 구간 텍스트 추출*/
                const title = $(
                    '#menu340_obj2839 > div._fnctWrap.diet > div.info > div.box-info > dl > dt'
                )
                    .text()
                    .trim();
                //console.log(title);
                const description = $(
                    '#menu340_obj2839 > div._fnctWrap.diet > div.info > div.box-info > dl > dd:nth-' +
                    'child(2)'
                )
                    .text()
                    .trim()
                    .replace(/\t/g, '')
                    .replace(/\n/g, '')
                    .concat('\n', $(
                        '#menu340_obj2839 > div._fnctWrap.diet > div.info > div.box-info > dl > dd:nth-' +
                        'child(3)'
                    ).text().trim().replace(/\t/g, '').replace(/\n/g, ''));
                //console.log(description);
                const trSize = $('#viewForm > div > table > tbody > tr').length;
                //console.log(trSize);
                const result = new Array();
                /*요일별 학식 메뉴 안내 테이블 값 갯수만큼 반복하여 학식 데이터를 추출*/
                for (let index = 1; index <= trSize; index++) {
                    const tdSize = $(
                        '#viewForm > div > table > tbody > tr:nth-child(' + index + ') > td'
                    ).length;
                    //console.log(tdSize);
                    result[index] = new Array();
                    for (let jndex = 2; jndex <= tdSize - 2; jndex++) {
                        result[index][jndex - 1] = $(
                            '#viewForm > div > table > tbody > tr:nth-child(' + index +
                            ') > td:nth-child(' + jndex + ')'
                        )
                            .text()
                            .replace(/ⓣ/g, '')
                            .replace(/,/g, '\n');
                    }
                }
                //console.log(result);
                /*추출한 학식당 정보를 DB에 저장*/
                await admin
                    .database()
                    .ref('School_Cafe/')
                    .set({title: `${title}`, description: `${description}`});
                const menuCount = $("#viewForm > div > table > tbody > tr").length;
                //console.log(menuCount);
                const menuTitle = [];
                /*음식의 종류 명칭 텍스트 값을 추출*/
                for (let index = 1; index <= menuCount; index++) {
                    menuTitle[index] = $(
                        "#viewForm > div > table > tbody > tr:nth-child(" + index +
                        ") > td:nth-child(1)"
                    ).text();
                }
                //console.log(menuTitle);
                /*음식 종류에 맞춰 추출한 요일별 학식 데이터를 DB에 저장*/
                for (let index = 1; index < menuTitle.length; index++) {
                    await admin
                        .database()
                        .ref('School_Cafe/' + menuTitle[index])
                        .update({menu: result[index]});
                }
                res.sendStatus(201); //성공 코드 전송
                console.log('School Cafe DB input success');
            })
            .catch(error => {
                console.error('Error from crawling cafe:', error);
                res.sendStatus(error.response.status); //에러 코드 전송
            });
    });