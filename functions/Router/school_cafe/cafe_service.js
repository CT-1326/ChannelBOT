const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const userRequest = req.body.userRequest.utterance;
    // console.log(userRequest);
    let day = new Date();
    let today = day.getDay();
    // console.log(today);
    let responseBody;

    if (today == 0 || today == 6) {
        responseBody = {
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
    } else {
        switch (userRequest) {
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
                        console.error('Error from nodel :', e);
                    });
                // console.log(nodel);
                responseBody = {
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
                        console.error('Error from rice :', e);;
                    });
                // console.log(rice);
                responseBody = {
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
                        console.error('Error from fried :', e);;
                    });
                // console.log(fried);
                responseBody = {
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
                break;

            default:
                break;
        }
    }

    res
        .status(201)
        .send(responseBody);
});

module.exports = router;