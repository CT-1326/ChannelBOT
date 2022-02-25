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
            .then(html => {
                const $ = cheerio.load(html.data);
                const inTitle = $("#menu262_obj3182 > h3").text();
                const inBody = $("#menu262_obj3183 > ul ")
                    .text()
                    .replace(/\n/g, "")
                    .split(')')
                    .join(')\n');
                // console.log(inTitle); console.log(inBody);
                const outTitle = $("#menu262_obj3185 > h3").text();
                const outBody = $("#menu262_obj3186 > ul")
                    .text()
                    .replace(/\n/g, "")
                    .split(')')
                    .join(')\n')
                    .replace(/\s+$/, '');
                // console.log(outTitle); console.log(outBody);
                const result = '[' + inTitle + ']\n' + inBody + '\n[' + outTitle + ']\n' +
                        outBody;
                return result;
            })
            .then(result => {
                console.log(result);
                admin
                    .database()
                    .ref('School_Bus/')
                    .set({info: result});
                res.send(201);
            })
            .catch(e => {
                console.error('Error from crawling bus:', e);
            })
        });