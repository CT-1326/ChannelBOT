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
                    "messageText": "학사 관련 알려줘",
                    "action": "block",
                    "blockId": "",
                    "label": "학사"
                }, {
                    "messageText": "새소식 관련 알려줘",
                    "action": "block",
                    "blockId": "",
                    "label": "새소식"
                }, {
                    "messageText": "장학/등록 관련 알려줘",
                    "action": "block",
                    "blockId": "",
                    "label": "장학/등록"
                }, {
                    "messageText": "입학 관련 알려줘",
                    "action": "block",
                    "blockId": "",
                    "label": "입학"
                }, {
                    "messageText": "취업 관련 알려줘",
                    "action": "block",
                    "blockId": "",
                    "label": "취업"
                }, {
                    "messageText": "행사 관련 알려줘",
                    "action": "block",
                    "blockId": "",
                    "label": "행사"
                }, {
                    "messageText": "글로벌 관련 알려줘",
                    "action": "block",
                    "blockId": "",
                    "label": "글로벌"
                }, {
                    "messageText": "일반 관련 알려줘",
                    "action": "block",
                    "blockId": "",
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