const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

router.post('/', async function (req, res) {
    const bus = await admin
        .database()
        .ref('School_Bus/')
        .child('info')
        .once('value')
        .then(snapshot => {
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
                        text: bus
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