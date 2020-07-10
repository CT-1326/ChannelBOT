const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.cafe_hub = functions
    .region('asia-northeast1')
    .https
    .onRequest(async(req, res) => {
        const userRequest = req.body.userRequest;
        const check = userRequest.utterance;

        switch (check) {
            case "면 종류 메뉴 알려줘":
                const responseBody = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleText: {
                                    text: "면 종류를 체크!"
                                }
                            }
                        ]
                    }
                };
                res
                    .status(200)
                    .send(responseBody);
                break;
            case "밥 종류 메뉴 알려줘":
                const responseBody2 = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleText: {
                                    text: "밥 종류를 체크!"
                                }
                            }
                        ]
                    }
                };
                res
                    .status(200)
                    .send(responseBody2);
                break;
            case "튀김 종류 메뉴 알려줘":
                const responseBody3 = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleText: {
                                    text: "튀김 종류를 체크!"
                                }
                            }
                        ]
                    }
                };
                res
                    .status(200)
                    .send(responseBody3);
                break;
                
            default:
                break;
        }
        return null;
    });