const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require("axios");
const cheerio = require("cheerio");

exports.scheduledFunction = functions.region('asia-northeast1').pubsub.schedule('0 0 * * *').onRun((context) => {
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
        const $bodaylist = $("#con-wrap > div.content > dl:nth-child(6) > dd");
        return $bodaylist.text();
    })
    .then((res) => {
        console.log(res);
        admin
            .database()
            .ref('School_Bus/')
            .set({info: res});
    });
return null;
});

// exports.bus = functions.region('asia-northeast1').https.onRequest(()=>{
// });