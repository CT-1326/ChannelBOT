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
            .then(html => {
                const $ = cheerio.load(html.data);
                const title = $(
                    '#menu340_obj2839 > div._fnctWrap.diet > div.info > div.box-info > dl'
                )
                    .text()
                    .trim()
                    .replace(/\t/g, '')
                    .replace(/\n\n/g, '\n');
                // console.log(title);
                const trSize = $('#viewForm > div > table > tbody > tr').length;
                // console.log(trSize);
                const result = new Array();
                result[0] = title;
                for (let index = 1; index <= trSize; index++) {
                    const tdSize = $(
                        '#viewForm > div > table > tbody > tr:nth-child(' + index + ') > td'
                    ).length;
                    // console.log(tdSize);
                    result[index] = new Array();
                    for (let jndex = 2; jndex <= tdSize - 2; jndex++) {
                        result[index][jndex] = $(
                            '#viewForm > div > table > tbody > tr:nth-child(' + index +
                            ') > td:nth-child(' + jndex + ')'
                        )
                            .text()
                            .replace(/ⓣ/g, '')
                            .replace(/,/g, '\n');
                    }
                }
                return result;
            })
            .then(async (result) => {
                console.log(result);
                await admin
                    .database()
                    .ref('School_Cafe/' + 0)
                    .set(result[0]);
                for (let index = 1; index <= 3; index++) {
                    await admin
                        .database()
                        .ref('School_Cafe/' + index)
                        .set({menu: result[index]});
                }
                res.send(201);
            })
            .catch(e => {
                console.error('Error from crawling cafe:', e);
            })
        });