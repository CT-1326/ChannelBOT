const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {
    const text = "스쿨 번호 입력!"

    const responseBody = {
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text: text
                    }
                }
            ]
        }
    };

    res
        .status(200)
        .send(responseBody);
});

module.exports = router;