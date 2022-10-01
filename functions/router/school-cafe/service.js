const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();
const functions = require('firebase-functions');

router.post('/', async (req, res) => {
    /* 사용자의 카카오 채널 추가 상태를 획인해 사용자가 요청한 학식 메뉴 데이터 혹은 경고문 출력 */
    const userFriend = req.body.userRequest.user.properties.isFriend;
    const userRequest = req.body.userRequest.utterance;
    // console.log(userRequest);
    let day = new Date();
    let today = day.getDay();
    // console.log(today);
    let responseBody;
    /* 뒤로가기 작성 */
    const quickReplies = [
        {
            "messageText": "뒤로 돌아갈래",
            "action": "block",
            "blockId": functions
                .config()
                .service_key
                .cafe_hub,
            "label": "↩ 뒤로가기"
        }
    ];

    if (userFriend === true) {
        /* 주말인 경우엔 관련 내용의 응답 블록으로 출력 */
        if (today === 0 || today === 6) {
            responseBody = {
                version: "2.0",
                template: {
                    outputs: [
                        {
                            simpleText: {
                                text: "오늘은 주말이라 학식당 운영이 없어요!"
                            }
                        }
                    ],
                    quickReplies: quickReplies
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
                .catch(err => {
                    console.error('Error from noodel :', err);
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
                .catch(err => {
                    console.error('Error from rice :', err);
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
                .catch(err => {
                    console.error('Error from fried :', err);
                });
            // console.log(fried);
            let menu;
            let itemList = [];
            let menuTitle = [];

            /* 사용자가 요청한 학식 종류 명칭의 데이터를 아이템 카드 본문으로 작성해 출력*/
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
                                            "title": "🍜 면 종류"
                                        },
                                        "itemList": itemList
                                    }
                                }
                            ],
                            quickReplies: quickReplies
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
                                            "title": "🍛 밥 종류"
                                        },
                                        "itemList": itemList
                                    }
                                }
                            ],
                            quickReplies: quickReplies
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
                                            "title": "🍤 튀김 종류"
                                        },
                                        "itemList": itemList
                                    }
                                }
                            ],
                            quickReplies: quickReplies
                        }
                    };
                    break;

                /* 전체 메뉴 조회 경우 응답 수를 늘려 한꺼번에 출력 */
                case "모든 메뉴를 알려줘":
                    menu = [noodel, rice, fried];
                    menuTitle = ['🍜 면 종류', '🍛 밥 종류', '🍤 튀김 종류'];
                    for (let index = 0; index < menu.length; index++) {
                        let items = [];
                        const element = menu[index].split('\n');
                        element.forEach((value, index) => {
                            // console.log(value, index);
                            items.push({
                                "title": index + 1,
                                "description": value
                            });
                        });
                        itemList.push({
                            itemCard: {
                                head: {
                                    "title": menuTitle[index]
                                },
                                itemList: items
                            }
                        });
                    }
                    // console.log(itemList);
                    responseBody = {
                        version: "2.0",
                        template: {
                            outputs: itemList,
                            quickReplies: quickReplies
                        }
                    };
                    break;

                default:
                    break;
            }
        }
    } else {
        responseBody = {
            version: "2.0",
            template: {
                outputs: [
                    {
                        simpleText: {
                            text: "🔕 채널봇 채널 추가부터 하셔야 이용이 가능해요!"
                        }
                    }
                ]
            }
        };
    }
    res
        .status(201)
        .send(responseBody);
});

module.exports = router;