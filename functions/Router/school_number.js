const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/', async function (req, res) {
    const text = await admin
    .database()
    .ref('School_Number/')
    .child('num')
    .once('value')
    .then((snapshot) => {
        return snapshot.val();
    })
    .catch((e) => {
        console.log(e);
    });

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