const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

router.post(async (req, res) => {
    const userRequest = req.body.userRequest;
    const check = userRequest.utterance;
    let day = new Date();
    let today = day.getDay();
    console.log(check);

    if (today == 0 || today == 6) {
        const responseBody = {
            version: "2.0",
            template: {
                outputs: [
                    {
                        simpleText: {
                            text: "오늘은 주말이라 학식당 운영이 없어요!"
                        }
                    }
                ]
            }
        };
        res
            .status(200)
            .send(responseBody);
    } else {
        switch (check) {
            case "면 종류 메뉴 알려줘":
                const nodel = await admin
                    .database()
                    .ref('School_Cafe/1')
                    .child('menu/' + (
                        today + 1
                    ))
                    .once('value')
                    .then(snapshot => {
                        return snapshot.val();
                    })
                    .catch(e => {
                        console.log(e);
                    });
                console.log(nodel);
                const responseBody = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleText: {
                                    text: nodel
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
                const rice = await admin
                    .database()
                    .ref('School_Cafe/2')
                    .child('menu/' + (
                        today + 1
                    ))
                    .once('value')
                    .then(snapshot => {
                        return snapshot.val();
                    })
                    .catch(e => {
                        console.log(e);
                    });
                console.log(rice);
                const responseBody2 = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleText: {
                                    text: rice
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
                const fried = await admin
                    .database()
                    .ref('School_Cafe/3')
                    .child('menu/' + (
                        today + 1
                    ))
                    .once('value')
                    .then(snapshot => {
                        return snapshot.val();
                    })
                    .catch(e => {
                        console.log(e);
                    });
                console.log(fried);
                const responseBody3 = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleText: {
                                    text: fried
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
});

module.exports = router;