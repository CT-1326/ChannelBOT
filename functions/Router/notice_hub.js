const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.noti_hub = functions
    .region('asia-northeast1')
    .https
    .onRequest((req, res) => {
        const userRequest = req.body.userRequest;
        const check = userRequest.utterance;

        switch (check) {
            case "학사 관련 알려줘":
                const responseBody = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleText: {
                                    text: "학사를 체크!"
                                }
                            }
                        ]
                    }
                };
                res
                    .status(200)
                    .send(responseBody);
                break;
            case "새소식 관련 알려줘":
                const responseBody2 = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleText: {
                                    text: "새소식 체크!"
                                }
                            }
                        ]
                    }
                };
                res
                    .status(200)
                    .send(responseBody2);
                break;
            case "장학/등록 관련 알려줘":
                const responseBody3 = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleText: {
                                    text: "장학/등록 체크!"
                                }
                            }
                        ]
                    }
                };
                res
                    .status(200)
                    .send(responseBody3);
                break;
            case "입학 관련 알려줘":
                const responseBody4 = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleText: {
                                    text: "입학 체크!"
                                }
                            }
                        ]
                    }
                };
                res
                    .status(200)
                    .send(responseBody4);
                break;
            case "취업 관련 알려줘":
                const responseBody5 = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleText: {
                                    text: "취업 체크!"
                                }
                            }
                        ]
                    }
                };
                res
                    .status(200)
                    .send(responseBody5);
                break;
            case "행사 관련 알려줘":
                const responseBody6 = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleText: {
                                    text: "행사 체크!"
                                }
                            }
                        ]
                    }
                };
                res
                    .status(200)
                    .send(responseBody6);
                break;
            case "글로벌 관련 알려줘":
                const responseBody7 = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleText: {
                                    text: "글로벌 체크!"
                                }
                            }
                        ]
                    }
                };
                res
                    .status(200)
                    .send(responseBody7);
                break;
            case "일반 관련 알려줘":
                const responseBody8 = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleText: {
                                    text: "일반 체크!"
                                }
                            }
                        ]
                    }
                };
                res
                    .status(200)
                    .send(responseBody8);
                break;

            default:
                break;
        }
        return null;
    });