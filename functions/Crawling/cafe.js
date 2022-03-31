const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require("axios");
const cheerio = require("cheerio");

exports.cafe = functions
    .region('asia-northeast1')
    .https
    .onRequest((req, res) => {
        axios
            .get('https://www.sungkyul.ac.kr/skukr/340/subview.do')
            .then(async (html) => {
                const $ = cheerio.load(html.data);
                const title = $(
                    '#menu340_obj2839 > div._fnctWrap.diet > div.info > div.box-info > dl > dt'
                )
                    .text()
                    .trim();
                // console.log(title);
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
                // console.log(description);
                const trSize = $('#viewForm > div > table > tbody > tr').length;
                // console.log(trSize);
                const result = new Array();
                for (let index = 1; index <= trSize; index++) {
                    const tdSize = $(
                        '#viewForm > div > table > tbody > tr:nth-child(' + index + ') > td'
                    ).length;
                    // console.log(tdSize);
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
                // console.log(result);
                await admin
                    .database()
                    .ref('School_Cafe/')
                    .set({title: `${title}`, description: `${description}`});
                const menuCount = $("#viewForm > div > table > tbody > tr").length;
                // console.log(menuCount);
                const menuTitle = [];
                for (let index = 1; index <= menuCount; index++) {
                    menuTitle[index] = $(
                        "#viewForm > div > table > tbody > tr:nth-child(" + index +
                        ") > td:nth-child(1)"
                    ).text();
                }
                // console.log(menuTitle);
                for (let index = 1; index < menuTitle.length; index++) {
                    await admin
                        .database()
                        .ref('School_Cafe/' + menuTitle[index])
                        .update({menu: result[index]});
                }
                res.send(201);
            })
            .catch(e => {
                console.error('Error from crawling cafe:', e);
            });
    });