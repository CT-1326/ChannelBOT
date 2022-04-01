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
        const noodel = await admin
            .database()
            .ref('School_Cafe/')
            .child('Roll & Noodles/menu/' + (
                today
            ))
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch(e => {
                console.error('Error from noodel :', e);
            });
        // console.log(noodel);
        const rice = await admin
            .database()
            .ref('School_Cafe/')
            .child('The bab/menu/' + (
                today
            ))
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch(e => {
                console.error('Error from rice :', e);
            });
        // console.log(rice);
        const fried = await admin
            .database()
            .ref('School_Cafe/')
            .child('Fry & Rice/menu/' + (
                today
            ))
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            })
            .catch(e => {
                console.error('Error from fried :', e);
            });
        // console.log(fried);
        let menu;
        let itemList = [];

        switch (userRequest) {
            case "면 종류 메뉴를 알려줘":
                menu = noodel.split('\n');
                menu.forEach((value, index) => {
                    // console.log(value, index);
                    itemList.push({
                        "title": index + 1,
                        "description": value
                    });
                });

                responseBody = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                itemCard: {
                                    "head": {
                                        "title": "면 종류"
                                    },
                                    "itemList": itemList
                                }
                            }
                        ]
                    }
                };
                break;

            case "밥 종류 메뉴를 알려줘":
                menu = rice.split('\n');
                menu.forEach((value, index) => {
                    // console.log(value, index);
                    itemList.push({
                        "title": index + 1,
                        "description": value
                    });
                });

                responseBody = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                itemCard: {
                                    "head": {
                                        "title": "밥 종류"
                                    },
                                    "itemList": itemList
                                }
                            }
                        ]
                    }
                };
                break;

            case "튀김 종류 메뉴를 알려줘":
                menu = fried.split('\n');
                menu.forEach((value, index) => {
                    // console.log(value, index);
                    itemList.push({
                        "title": index + 1,
                        "description": value
                    });
                });

                responseBody = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                itemCard: {
                                    "head": {
                                        "title": "튀김 종류"
                                    },
                                    "itemList": itemList
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