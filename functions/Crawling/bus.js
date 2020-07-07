const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require("axios");
const cheerio = require("cheerio");

exports.bus = functions
    .region('asia-northeast1')
    .https
    .onRequest(() => {
        try {
            const getData = async () => {
                try {
                    return await axios.get(
                        'https://www.sungkyul.ac.kr/mbs/skukr/subview.jsp?id=skukr_010802000000'
                    );
                } catch (error) {
                    console.log(error);
                }
            };
            getData()
                .then(html => {
                    const $ = cheerio.load(html.data);
                    const title = $(
                        "#con-wrap > div.content > dl:nth-child(6) > dd > p:nth-child(1)"
                    )
                        .text()
                        .replace(/\n|\t/g, "");
                    const body = $(
                        "#con-wrap > div.content > dl:nth-child(6) > dd > ol:nth-child(2)"
                    )
                        .text()
                        .replace(/\t/g, "");
                    const title2 = $(
                        "#con-wrap > div.content > dl:nth-child(6) > dd > p.sub_title.mt10"
                    )
                        .text()
                        .replace(/\n|\t/g, "");
                    const body2 = $(
                        "#con-wrap > div.content > dl:nth-child(6) > dd > ol:nth-child(4)"
                    )
                        .text()
                        .replace(/\s+$|\t/g, "");

                    const result = '[' + title + ']' + body + '\n[' + title2 + ']' + body2;
                    return result;
                })
                .then(res => {
                    console.log(res);
                    admin
                        .database()
                        .ref('School_Bus/')
                        .set({info: res});
                });
            return null;
        } catch (error) {
            console.log('WTF : ', error);
        }
    });