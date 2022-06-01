const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();
const functions = require('firebase-functions');

router.post('/', async (req, res) => {
    const userRequest = req.body.userRequest.utterance; // 사용자 요청문
    // console.log(userRequest);
    let day = new Date();
    let today = day.getDay(); // 오늘 날짜
    // console.log(today);
    let responseBody;
    const quickReplies = [
        {
            // 바로가기 작성
            "messageText": "뒤로 돌아갈래",
            "action": "block",
            "blockId": functions
                .config()
                .service_key
                .cafe_hub,
            "label": "↩ 뒤로가기"
        }
    ];

    if (today == 0 || today == 6) { // 주말인 경우
        responseBody = {
            version: "2.0",
            template: {
                outputs: [
                    {
                        simpleText: {
                            text: "오늘은 주말이라 학식당 운영이 없어요!" // 텍스트 뷰 블록으로 출력
                        }
                    }
                ],
                quickReplies: quickReplies // 바로가기 출력
            }
        };
    } else { // 평일인 경우
        const noodel = await admin
            .database()
            .ref('School_Cafe/')
            .child('Roll & Noodles/menu/' + (
                today
            ))
            .once('value')
            .then(snapshot => {
                return snapshot.val(); // 오늘의 면 종류 데이터 get
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
                return snapshot.val(); // 오늘의 밥 종류 데이터 get
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
                return snapshot.val(); // 오늘의 튀김 종류 데이터 get
            })
            .catch(e => {
                console.error('Error from fried :', e);
            });
        // console.log(fried);
        let menu;
        let itemList = [];

        switch (userRequest) {
            case "면 종류 메뉴를 알려줘":
                /* 선택한 음식 종류 명칭과 데이터를 아이템 카드 본문으로 작성*/
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
                                itemCard: { // 아이템 카드 뷰 블록으로 출력
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

            case "모든 메뉴를 알려줘":
                menu = [noodel, rice, fried];
                const menuTitle = ['🍜 면 종류', '🍛 밥 종류', '🍤 튀김 종류'];
                for (let i = 0; i < menu.length; i++) {
                    let items = [];
                    const element = menu[i].split('\n');
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
                                "title": menuTitle[i]
                            },
                            itemList: items
                        }
                    });
                }
                console.log(itemList);
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
    res
        .status(201)
        .send(responseBody); // 응답 상태 코드와 내용 전송
});

module.exports = router;