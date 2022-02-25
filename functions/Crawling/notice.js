const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require("axios");
const cheerio = require("cheerio");

exports.notice = functions
    .region('asia-northeast1')
    .https
    .onRequest((req, res) => {
        axios
            .get('https://www.sungkyul.ac.kr/sites/skukr/index.do#page2')
            .then(html => {
                const $ = cheerio.load(html.data);
                const liSize = $('#menu160_obj5589 > div._fnctWrap > div > ul > li').length;
                // console.log(liSize);
                const title = new Array();
                const date = new Array();
                const url = new Array();
                for (let index = 1; index <= liSize; index++) {
                    const inliSize = $(
                        '#menu160_obj5589 > div._fnctWrap > div > ul > li:nth-child(' + index + ') > di' +
                        'v > ul > li'
                    ).length;
                    // console.log(inliSize);
                    title[index] = new Array();
                    date[index] = new Array();
                    url[index] = new Array();
                    for (let jndex = 1; jndex <= inliSize; jndex++) {
                        title[index][jndex] = $(
                            '#menu160_obj5589 > div._fnctWrap > div > ul > li:nth-child(' + index + ') > di' +
                            'v > ul > li:nth-child(' + jndex + ') > div > div > a > strong'
                        ).text();
                        date[index][jndex] = $(
                            '#menu160_obj5589 > div._fnctWrap > div > ul > li:nth-child(' + index + ') > di' +
                            'v > ul > li:nth-child(' + jndex + ') > div > span'
                        ).text();
                        url[index][jndex] = $(
                            '#menu160_obj5589 > div._fnctWrap > div > ul > li:nth-child(' + index + ') > di' +
                            'v > ul > li:nth-child(' + jndex + ') > div > div > a'
                        )
                            .attr('href')
                            .replace(/^/, 'https://www.sungkyul.ac.kr');
                    }
                }
                return ([title, date, url]);
            })
            .then(async ([title, date, url]) => {
                console.log("타이틀: ", title);
                console.log("날짜: ", date);
                console.log("링크: ", url);
                const item = [
                    '학사',
                    '새소식',
                    '장학+등록',
                    '입학',
                    '취업',
                    '행사',
                    '글로벌',
                    '일반',
                    '비교과'
                ];
                for (let index = 0; index < item.length; index++) {
                    await admin
                        .database()
                        .ref('School_Notice/' + item[index])
                        .set({
                            title: title[index + 1],
                            date: date[index + 1],
                            url: url[index + 1]
                        });
                }
                res.send(201);
            })
            .catch(e => {
                console.error('Error from crawling notice:', e);
            })
        });