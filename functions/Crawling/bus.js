const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require("axios");
const cheerio = require("cheerio");

exports.bus = functions
    .region('asia-northeast1')
    .https
    .onRequest((req, res) => {
        axios
            .get('https://www.sungkyul.ac.kr/skukr/262/subview.do')
            .then(async (html) => {
                const $ = cheerio.load(html.data);
                const inTitle = $("#menu262_obj3182 > h3").text();
                const inBody = $("#menu262_obj3183 > ul > li:nth-child(1)").text();
                const inBody2 = $("#menu262_obj3183 > ul > li:nth-child(2)").text();
                console.log(inTitle);
                console.log(inBody, inBody2);
                const outTitle = $("#menu262_obj3185 > h3").text();
                const outBody = $("#menu262_obj3186 > ul > li:nth-child(1)").text();
                const outBody2 = $("#menu262_obj3186 > ul > li:nth-child(2)").text();
                console.log(outTitle);
                console.log(outBody, outBody2);
                
                await admin
                    .database()
                    .ref('School_Bus/')
                    .set({
                        in: {
                            title: `${inTitle}`,
                            start: `${inBody}`,
                            end: `${inBody2}`
                        },
                        out: {
                            title: `${outTitle}`,
                            start: `${outBody}`,
                            end: `${outBody2}`
                        }
                    });
                res.send(201);
            })
            .catch(e => {
                console.error('Error from crawling bus:', e);
            })
        });