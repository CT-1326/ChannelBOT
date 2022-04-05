const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const userRequest = req.body.userRequest.utterance; // 사용자 요청문
    // console.log(userRequest);
    let day = new Date();
    let today = day.getDay(); // 오늘 날짜
    // console.log(today);
    let responseBody;

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
                ]
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
                /*선택한 음식 종류 명칭과 데이터를 아이템 카드 본문으로 작성*/
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
                                        "title": "🍛 밥 종류"
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
                                        "title": "🍤 튀김 종류"
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
        .send(responseBody); // 응답 상태 코드와 내용 전송
});

module.exports = router;