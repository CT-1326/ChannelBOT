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
                        text: "원하시는 메뉴 분야를 선택해주세요!"
                    }
                }
            ],
            quickReplies: [
                {
                    "messageText": "면 종류 메뉴 알려줘",
                    "action": "block",
                    "blockId": "",
                    "label": "면 종류"
                }, {
                    "messageText": "밥 종류 메뉴 알려줘",
                    "action": "block",
                    "blockId": "",
                    "label": "밥 종류"
                }, {
                    "messageText": "튀김 종류 메뉴 알려줘",
                    "action": "block",
                    "blockId": "",
                    "label": "튀김 종류"
                }
            ]
        }
    };

    res
        .status(200)
        .send(responseBody);
});

module.exports = router;