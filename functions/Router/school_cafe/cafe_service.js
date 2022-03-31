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
        console.log(userRequest);
        // let title = ['현재 해당 서비스는 업데이트중에 있어요!','현재 해당 서비스는 업데이트중에 있어요!','현재 해당 서비스는 업데이트중에 있어요!'];
        // let itemList = [];

        switch (userRequest) {
            case "면 종류 메뉴 알려줘":
                responseBody = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleText: {
                                    text: "현재 서비스 점검중에 있어요!"
                                }
                            }
                        ]
                    }
                };
                break;

            case "밥 종류 메뉴 알려줘":
                responseBody = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleText: {
                                    text: "현재 서비스 점검중에 있어요!"
                                }
                            }
                        ]
                    }
                };
                break;

            case "튀김 종류 메뉴 알려줘":
                responseBody = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                simpleText: {
                                    text: "현재 서비스 점검중에 있어요!"
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