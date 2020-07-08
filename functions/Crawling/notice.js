const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require("axios");
const cheerio = require("cheerio");

exports.notice = functions
    .region('asia-northeast1')
    .https
    .onRequest(() => {
        try {
            const getData = async () => {
                try {
                    return await axios.get('https://www.sungkyul.ac.kr/mbs/skukr/index.jsp');
                } catch (error) {
                    console.log(error);
                }
            };
            getData()
                .then(html => {
                    const $ = cheerio.load(html.data);
                    const size = $('#main > div.main-bottom > div > div.recent-board > ul > li').length;
                    const result = new Array(size + 1);
                    
                    for (let index = 1; index <= size; index++) {
                        const size2 = $('#new-tabscon' + index + '> ul > li').length;
                        result[index] = new Array(size2 + 1);
                        for (let jindex = 1; jindex <= size2; jindex++) {
                            result[index][jindex] = $(
                                '#new-tabscon' + index + '> ul > li:nth-child(' + jindex + ')'
                            ).text();
                        }
                    }
                    return result;
                })
                .then(async (res) => {
                    console.log(res);
                    const item = [
                        '학사',
                        '새소식',
                        '장학+등록',
                        '입학',
                        '행사',
                        '글로벌',
                        '일반',
                        '취업'
                    ];
                    for (let index = 0; index < item.length; index++) {
                        await admin
                            .database()
                            .ref('School_Notice/' + item[index])
                            .set({
                                title: res[index + 1]
                            });
                    }
                });
            return null;
        } catch (error) {
            console.log('WTF : ', error);
        }
    });