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
                        text: "[중생관 지하1층 학식당]\n보고 싶은 오늘의 학식 종류를 선택해주세요\n\n* 학식당은 오전 11시부터 오후 6시30분까지 운영됩니다! (Break time 15:30 ~ 16:30)"
                    }
                }
            ],
            quickReplies: [
                {
                    "messageText": "면 종류 메뉴 알려줘",
                    "action": "block",
                    "blockId": req.headers.key,
                    "label": "면 종류"
                }, {
                    "messageText": "밥 종류 메뉴 알려줘",
                    "action": "block",
                    "blockId": req.headers.key,
                    "label": "밥 종류"
                }, {
                    "messageText": "튀김 종류 메뉴 알려줘",
                    "action": "block",
                    "blockId": req.headers.key,
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