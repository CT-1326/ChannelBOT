const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require("axios");
const cheerio = require("cheerio");

exports.cafe = functions
    .region('asia-northeast1')
    .https
    .onRequest(async () => {
        try {
            await axios
                .get('https://www.sungkyul.ac.kr/skukr/340/subview.do')
                .then(html => {
                    const $ = cheerio.load(html.data);
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
                            result[index][jndex] = $(
                                '#viewForm > div > table > tbody > tr:nth-child(' + index +
                                ') > td:nth-child(' + jndex + ')'
                            )
                                .text()
                                .replace(/,/g, '\n');
                        }
                    }
                    return result;
                })
                .then(async (res) => {
                    console.log(res);
                    for (let index = 1; index <= 3; index++) {
                        await admin
                            .database()
                            .ref('School_Cafe/' + index)
                            .set({menu: res[index]});
                    }
                })
        } catch (error) {
            console.log('WTF : ', error);
        }
    });