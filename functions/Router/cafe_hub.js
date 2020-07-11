const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.cafe_hub = functions
    .region('asia-northeast1')
    .https
    .onRequest(async (req, res) => {
        const userRequest = req.body.userRequest;
        const check = userRequest.utterance;
        const non = await admin
            .database()
            .ref('School_Cafe/')
            .child('info')
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch(e => {
                console.log(e);
            });
        let today = new Date();
        let day = today.getDay();

        if (day > 5) {
            const responseBody = {
                version: "2.0",
                template: {
                    outputs: [
                        {
                            simpleText: {
                                text: "오늘은 주말이라 학식당 운영이 없어요"
                            }
                        }
                    ]
                }
            };
            res
                .status(200)
                .send(responseBody);
        } else if (non) {
            const respon = {
                version: "2.0",
                template: {
                    outputs: [
                        {
                            simpleText: {
                                text: "현재 식단이 존재하지 않습니다"
                            }
                        }
                    ]
                }
            };
            res
                .status(200)
                .send(respon);
        } else {
            switch (check) {
                case "면 종류 메뉴 알려줘":
                    const text = await admin
                        .database()
                        .ref('School_Cafe/' + day)
                        .child('menu/1')
                        .once('value')
                        .then(snapshot => {
                            return snapshot.val();
                        })
                        .catch(e => {
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
                    break;

                case "밥 종류 메뉴 알려줘":
                    const text2 = await admin
                        .database()
                        .ref('School_Cafe/' + day)
                        .child('menu/3')
                        .once('value')
                        .then(snapshot => {
                            return snapshot.val();
                        })
                        .catch(e => {
                            console.log(e);
                        });
                    const responseBody2 = {
                        version: "2.0",
                        template: {
                            outputs: [
                                {
                                    simpleText: {
                                        text: text2
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
                    const text3 = await admin
                        .database()
                        .ref('School_Cafe/' + day)
                        .child('menu/5')
                        .once('value')
                        .then(snapshot => {
                            return snapshot.val();
                        })
                        .catch(e => {
                            console.log(e);
                        });
                    const responseBody3 = {
                        version: "2.0",
                        template: {
                            outputs: [
                                {
                                    simpleText: {
                                        text: text3
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
        }
        return null;
    });