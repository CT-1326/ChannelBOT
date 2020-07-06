const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/', async function (req, res) {
    const responseBody = {
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text: "원하시는 학교 공지사항 메뉴를 선택해주세요!"
                    }
                }
            ],
            quickReplies: [
                {
                    "messageText": "학사 메뉴",
                    "action": "message",
                    "label": "학사"
                }, {
                    "messageText": "새소식 메뉴",
                    "action": "message",
                    "label": "새소식"
                }, {
                    "messageText": "장학/등록 메뉴",
                    "action": "message",
                    "label": "장학/등록"
                }, {
                    "messageText": "입학 메뉴",
                    "action": "message",
                    "label": "입학"
                }, {
                    "messageText": "취업 메뉴",
                    "action": "message",
                    "label": "취업"
                }, {
                    "messageText": "행사 메뉴",
                    "action": "message",
                    "label": "행사"
                }, {
                    "messageText": "일반 메뉴",
                    "action": "message",
                    "label": "일반"
                }
            ]
        }
    };

    res
        .status(200)
        .send(responseBody);
});

module.exports = router;