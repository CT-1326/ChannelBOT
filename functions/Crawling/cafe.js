const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require("axios");
const cheerio = require("cheerio");

exports.cafe = functions
    .region('asia-northeast1')
    .https
    .onRequest(() => {
        try {
            const getData = async () => {
                try {
                    return await axios.get(
                        'https://www.sungkyul.ac.kr/mbs/skukr/jsp/restaurant/restaurant.jsp?configIdx=1' +
                        '&id=skukr_050701000000'
                    );
                } catch (error) {
                    console.log(error);
                }
            };
            getData()
                .then(html => {
                    const $ = cheerio.load(html.data);
                    const size = $('#con-wrap > div.content > div.menubody > div > table').length;
                    if (size == 0) {
                        const result = "현재 식단이 존재하지 않습니다!";
                        return result;
                    }

                    const result = new Array(size + 1);
                    for (let index = 1; index <= size; index++) {
                        const size2 = $(
                            '#con-wrap > div.content > div.menubody > div > table:nth-child(1) > tbody > tr'
                        ).length;
                        result[index] = new Array(size2 + 1);
                        for (let jindex = 1; jindex <= size2; jindex++) {
                            if (jindex % 2 == 0) {
                                continue;
                            } else {
                                result[index][jindex] = $(
                                    '#con-wrap > div.content > div.menubody > div > table:nth-child(' + index + ') ' +
                                    '> tbody > tr:nth-child(' + jindex + ') > td'
                                )
                                    .text()
                                    .replace(/\s/g, '')
                                    .replace(/,/g, '\n\n');
                            }
                        }
                    }
                    return result;
                })
                .then(async (res) => {
                    console.log(res);
                    if (typeof(res) == "string") {
                        await admin
                            .database()
                            .ref('School_Cafe/')
                            .set({info: res});
                    } else {
                        await admin
                            .database()
                            .ref('School_Cafe/')
                            .remove();
                        for (let index = 1; index <= 5; index++) {
                            await admin
                                .database()
                                .ref('School_Cafe/' + index)
                                .set({menu: res[index]});
                        }
                    }
                });
            return null;
        } catch (error) {
            console.log('WTF : ', error);
        }
    });