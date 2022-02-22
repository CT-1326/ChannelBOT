const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require("axios");
const cheerio = require("cheerio");

exports.bus = functions
    .region('asia-northeast1')
    .https
    .onRequest(() => {
        axios
            .get('https://www.sungkyul.ac.kr/skukr/262/subview.do')
            .then(html => {
                const $ = cheerio.load(html.data);
                const title = $("#menu262_obj3182 > h3").text();
                const body = $("#menu262_obj3183 > ul ")
                    .text()
                    .replace(/\n/g, "")
                    .split(')')
                    .join(')\n');
                // console.log(title); console.log(body);
                const title2 = $("#menu262_obj3185 > h3").text();
                const body2 = $("#menu262_obj3186 > ul")
                    .text()
                    .replace(/\n/g, "")
                    .split(')')
                    .join(')\n')
                    .replace(/\s+$/, '');
                // console.log(title2); console.log(body2);
                const result = '[' + title + ']\n' + body + '\n[' + title2 + ']\n' + body2;
                return result;
            })
            .then(res => {
                console.log(res);
                admin
                    .database()
                    .ref('School_Bus/')
                    .set({info: res});
            })
            .catch(e => {
                console.error('Error from crawling bus:', e);
            })
        });