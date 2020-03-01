const functions = require('firebase-functions');
const express = require('express')
const app = express()

const apiRouter = express.Router()

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

app.use('/api/', apiRouter)

apiRouter.post('/sayHello', function (req, res) {
    const responseBody = {
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleText: {
                        text: "hello I'm Ryan"
                    }
                }
            ]
        }
    };

    res
        .status(200)
        .send(responseBody);
});

apiRouter.post('/showHello', function (req, res) {
    console.log(req.body);

    const responseBody = {
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleImage: {
                        imageUrl: "https://t1.daumcdn.net/friends/prod/category/M001_friends_ryan2.jpg",
                        altText: "hello I'm Ryan"
                    }
                }
            ]
        }
    };

    res
        .status(200)
        .send(responseBody);
});

app.get('*', function (req, res) {
    res.send('firebase + express test page')
});

exports.helloWorld = functions
    .region('asia-northeast1')
    .https
    .onRequest(app);
