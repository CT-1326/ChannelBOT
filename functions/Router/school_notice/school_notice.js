const express = require('express');
const router = express.Router();

router.post('/', async function (req, res) {
    console.log(req.headers.key);
    const responseBody = {
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text: "원하시는 학교 공지사항 메뉴를 선택해주세요"
                    }
                }
            ],
            quickReplies: [
                {
                    "messageText": "학사 관련해서 알려줘",
                    "action": "block",
                    "blockId": req.headers.key,
                    "label": "학사"
                }, {
                    "messageText": "새소식 관련해서 알려줘",
                    "action": "block",
                    "blockId": req.headers.key,
                    "label": "새소식"
                }, {
                    "messageText": "장학/등록 관련해서 알려줘",
                    "action": "block",
                    "blockId": req.headers.key,
                    "label": "장학/등록"
                }, {
                    "messageText": "입학 관련해서 알려줘",
                    "action": "block",
                    "blockId": req.headers.key,
                    "label": "입학"
                }, {
                    "messageText": "취업 관련해서 알려줘",
                    "action": "block",
                    "blockId": req.headers.key,
                    "label": "취업"
                }, {
                    "messageText": "행사 관련해서 알려줘",
                    "action": "block",
                    "blockId": req.headers.key,
                    "label": "행사"
                }, {
                    "messageText": "글로벌 관련해서 알려줘",
                    "action": "block",
                    "blockId": req.headers.key,
                    "label": "글로벌"
                }, {
                    "messageText": "일반 관련해서 알려줘",
                    "action": "block",
                    "blockId": req.headers.key,
                    "label": "일반"
                }, {
                    "messageText": "비교과 관련해서 알려줘",
                    "action": "block",
                    "blockId": req.headers.key,
                    "label": "비교과"
                }
            ]
        }
    };

    res
        .status(200)
        .send(responseBody);
});

module.exports = router;