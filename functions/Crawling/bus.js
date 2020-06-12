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
                        'https://www.sungkyul.ac.kr/mbs/skukr/jsp/board/view.jsp?boardId=38&boardSeq=274002&mcategoryId=&id=skukr_060107000000'
                        // 'https://www.sungkyul.ac.kr/mbs/skukr/subview.jsp?id=skukr_010802000000'
                    );
                } catch (error) {
                    console.log(error);
                }
            };

            getData()
                .then(html => {
                    const $ = cheerio.load(html.data);
                    const date = $('#con-wrap > div.content > dl > dd > div > p:nth-child(3)').text().replace(/\s/g,'');
                    const time = $('#con-wrap > div.content > dl > dd > div > p:nth-child(5)').text();
                    const moring = $('#con-wrap > div.content > dl > dd > div > p:nth-child(7)').text();
                    const day = $('#con-wrap > div.content > dl > dd > div > p:nth-child(8)').text();
                    const after = $('#con-wrap > div.content > dl > dd > div > p:nth-child(9)').text();
                    const count = $('#con-wrap > div.content > dl > dd > div > p:nth-child(11)').text().replace(/\s/g,'');;
                    const noti = $('#con-wrap > div.content > dl > dd > div > p:nth-child(13)').text().replace(/\s/g,'');;
                    const result = date + '\n\n' + time + '\n' + moring + '\n' + day + '\n' + after + '\n\n' + count + '\n\n' + noti;
                    // const title = $(
                    //     "#con-wrap > div.content > dl:nth-child(6) > dd > p:nth-child(1)"
                    // )
                    //     .text()
                    //     .replace(/\n|\t/g, "");
                    // const body = $(
                    //     "#con-wrap > div.content > dl:nth-child(6) > dd > ol:nth-child(2)"
                    // )
                    //     .text()
                    //     .replace(/\t/g, "");
                    // const title2 = $(
                    //     "#con-wrap > div.content > dl:nth-child(6) > dd > p.sub_title.mt10"
                    // )
                    //     .text()
                    //     .replace(/\n|\t/g, "");
                    // const body2 = $(
                    //     "#con-wrap > div.content > dl:nth-child(6) > dd > ol:nth-child(4)"
                    // )
                    //     .text()
                    //     .replace(/\s+$|\t/g, "");

                    // const result = '[' + title + ']' + body + '\n[' + title2 + ']' + body2;
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