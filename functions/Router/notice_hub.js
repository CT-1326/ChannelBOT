const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.noti_hub = functions
    .region('asia-northeast1')
    .https
    .onRequest(async (req, res) => {
        const userRequest = req.body.userRequest;
        const check = userRequest.utterance;

        switch (check) {
            case "학사 관련해서 알려줘":
                const result = await admin
                    .database()
                    .ref('School_Notice/학사')
                    .child('title')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const date_result = await admin
                    .database()
                    .ref('School_Notice/학사')
                    .child('date')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const url_result = await admin
                    .database()
                    .ref('School_Notice/학사')
                    .child('url')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const responseBody = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                "listCard": {
                                    "header": {
                                        "title": "학사 공지사항"
                                    },
                                    "items": [
                                        {
                                            "title": result[0],
                                            "description": date_result[0],
                                            "link": {
                                                "web": url_result[0]
                                            }
                                        }, {
                                            "title": result[1],
                                            "description": date_result[1],
                                            "link": {
                                                "web": url_result[1]
                                            }
                                        }, {
                                            "title": result[2],
                                            "description": date_result[2],
                                            "link": {
                                                "web": url_result[2]
                                            }
                                        }, {
                                            "title": result[3],
                                            "description": date_result[3],
                                            "link": {
                                                "web": url_result[3]
                                            }
                                        }, {
                                            "title": result[4],
                                            "description": date_result[4],
                                            "link": {
                                                "web": url_result[4]
                                            }
                                        }
                                    ],
                                    "buttons": [
                                        {
                                            "label": "학사 공지사항 페이지",
                                            "action": "webLink",
                                            "webLinkUrl": "https://www.sungkyul.ac.kr/mbs/skukr/jsp/board/list.jsp?boardId=29&id=skukr_06" +
                                                "0102000000"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                };
                res
                    .status(200)
                    .send(responseBody);
                break;

            case "새소식 관련해서 알려줘":
                const result2 = await admin
                    .database()
                    .ref('School_Notice/새소식')
                    .child('title')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const date_result2 = await admin
                    .database()
                    .ref('School_Notice/새소식')
                    .child('date')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const url_result2 = await admin
                    .database()
                    .ref('School_Notice/새소식')
                    .child('url')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const responseBody2 = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                "listCard": {
                                    "header": {
                                        "title": "새소식 공지사항"
                                    },
                                    "items": [
                                        {
                                            "title": result2[0],
                                            "description": date_result2[0],
                                            "link": {
                                                "web": url_result2[0]
                                            }
                                        }, {
                                            "title": result2[1],
                                            "description": date_result2[1],
                                            "link": {
                                                "web": url_result2[1]
                                            }
                                        }, {
                                            "title": result2[2],
                                            "description": date_result2[2],
                                            "link": {
                                                "web": url_result2[2]
                                            }
                                        }, {
                                            "title": result2[3],
                                            "description": date_result2[3],
                                            "link": {
                                                "web": url_result2[3]
                                            }
                                        }, {
                                            "title": result2[4],
                                            "description": date_result2[4],
                                            "link": {
                                                "web": url_result2[4]
                                            }
                                        }
                                    ],
                                    "buttons": [
                                        {
                                            "label": "새소식 공지사항 페이지",
                                            "action": "webLink",
                                            "webLinkUrl": "https://www.sungkyul.ac.kr/mbs/skukr/jsp/board/list.jsp?boardId=33&id=skukr_06" +
                                                "0101000000"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                };
                res
                    .status(200)
                    .send(responseBody2);
                break;

            case "장학/등록 관련해서 알려줘":
                const result3 = await admin
                    .database()
                    .ref('School_Notice/장학+등록')
                    .child('title')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const date_result3 = await admin
                    .database()
                    .ref('School_Notice/장학+등록')
                    .child('date')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const url_result3 = await admin
                    .database()
                    .ref('School_Notice/장학+등록')
                    .child('url')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const responseBody3 = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                "listCard": {
                                    "header": {
                                        "title": "장학/등록 공지사항"
                                    },
                                    "items": [
                                        {
                                            "title": result3[0],
                                            "description": date_result3[0],
                                            "link": {
                                                "web": url_result3[0]
                                            }
                                        }, {
                                            "title": result3[1],
                                            "description": date_result3[1],
                                            "link": {
                                                "web": url_result3[1]
                                            }
                                        }, {
                                            "title": result3[2],
                                            "description": date_result3[2],
                                            "link": {
                                                "web": url_result3[2]
                                            }
                                        }, {
                                            "title": result3[3],
                                            "description": date_result3[3],
                                            "link": {
                                                "web": url_result3[3]
                                            }
                                        }, {
                                            "title": result3[4],
                                            "description": date_result3[4],
                                            "link": {
                                                "web": url_result3[4]
                                            }
                                        }
                                    ],
                                    "buttons": [
                                        {
                                            "label": "장학/등록 공지사항 페이지",
                                            "action": "webLink",
                                            "webLinkUrl": "https://www.sungkyul.ac.kr/mbs/skukr/jsp/board/list.jsp?boardId=34&id=skukr_06" +
                                                "0103000000"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                };
                res
                    .status(200)
                    .send(responseBody3);
                break;

            case "입학 관련해서 알려줘":
                const result4 = await admin
                    .database()
                    .ref('School_Notice/입학')
                    .child('title')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const date_result4 = await admin
                    .database()
                    .ref('School_Notice/입학')
                    .child('date')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const url_result4 = await admin
                    .database()
                    .ref('School_Notice/입학')
                    .child('url')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const responseBody4 = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                "listCard": {
                                    "header": {
                                        "title": "입학 공지사항"
                                    },
                                    "items": [
                                        {
                                            "title": result4[0],
                                            "description": date_result4[0],
                                            "link": {
                                                "web": url_result4[0]
                                            }
                                        }, {
                                            "title": result4[1],
                                            "description": date_result4[1],
                                            "link": {
                                                "web": url_result4[1]
                                            }
                                        }, {
                                            "title": result4[2],
                                            "description": date_result4[2],
                                            "link": {
                                                "web": url_result4[2]
                                            }
                                        }, {
                                            "title": result4[3],
                                            "description": date_result4[3],
                                            "link": {
                                                "web": url_result4[3]
                                            }
                                        }, {
                                            "title": result4[4],
                                            "description": date_result4[4],
                                            "link": {
                                                "web": url_result4[4]
                                            }
                                        }
                                    ],
                                    "buttons": [
                                        {
                                            "label": "입학 공지사항 페이지",
                                            "action": "webLink",
                                            "webLinkUrl": "https://www.sungkyul.ac.kr/mbs/skukr/jsp/board/list.jsp?boardId=35&id=skukr_06" +
                                                "0104000000"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                };
                res
                    .status(200)
                    .send(responseBody4);
                break;

            case "취업 관련해서 알려줘":
                const result5 = await admin
                    .database()
                    .ref('School_Notice/취업')
                    .child('title')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const date_result5 = await admin
                    .database()
                    .ref('School_Notice/취업')
                    .child('date')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const url_result5 = await admin
                    .database()
                    .ref('School_Notice/취업')
                    .child('url')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const responseBody5 = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                "listCard": {
                                    "header": {
                                        "title": "취업 공지사항"
                                    },
                                    "items": [
                                        {
                                            "title": result5[0],
                                            "description": date_result5[0],
                                            "link": {
                                                "web": url_result5[0]
                                            }
                                        }, {
                                            "title": result5[1],
                                            "description": date_result5[1],
                                            "link": {
                                                "web": url_result5[1]
                                            }
                                        }, {
                                            "title": result5[2],
                                            "description": date_result5[2],
                                            "link": {
                                                "web": url_result5[2]
                                            }
                                        }, {
                                            "title": result5[3],
                                            "description": date_result5[3],
                                            "link": {
                                                "web": url_result5[3]
                                            }
                                        }, {
                                            "title": result5[4],
                                            "description": date_result5[4],
                                            "link": {
                                                "web": url_result5[4]
                                            }
                                        }
                                    ],
                                    "buttons": [
                                        {
                                            "label": "취업 공지사항 페이지",
                                            "action": "webLink",
                                            "webLinkUrl": "https://www.sungkyul.ac.kr/mbs/skukr/jsp/board/list.jsp?boardId=90&id=skukr_06" +
                                                "0109000000"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                };
                res
                    .status(200)
                    .send(responseBody5);
                break;

            case "행사 관련해서 알려줘":
                const result6 = await admin
                    .database()
                    .ref('School_Notice/행사')
                    .child('title')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const date_result6 = await admin
                    .database()
                    .ref('School_Notice/행사')
                    .child('date')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const url_result6 = await admin
                    .database()
                    .ref('School_Notice/행사')
                    .child('url')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const responseBody6 = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                "listCard": {
                                    "header": {
                                        "title": "행사 공지사항"
                                    },
                                    "items": [
                                        {
                                            "title": result6[0],
                                            "description": date_result6[0],
                                            "link": {
                                                "web": url_result6[0]
                                            }
                                        }, {
                                            "title": result6[1],
                                            "description": date_result6[1],
                                            "link": {
                                                "web": url_result6[1]
                                            }
                                        }, {
                                            "title": result6[2],
                                            "description": date_result6[2],
                                            "link": {
                                                "web": url_result6[2]
                                            }
                                        }, {
                                            "title": result6[3],
                                            "description": date_result6[3],
                                            "link": {
                                                "web": url_result6[3]
                                            }
                                        }, {
                                            "title": result6[4],
                                            "description": date_result6[4],
                                            "link": {
                                                "web": url_result6[4]
                                            }
                                        }
                                    ],
                                    "buttons": [
                                        {
                                            "label": "행사 공지사항 페이지",
                                            "action": "webLink",
                                            "webLinkUrl": "https://www.sungkyul.ac.kr/mbs/skukr/jsp/board/list.jsp?boardId=36&id=skukr_06" +
                                                "0105000000"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                };
                res
                    .status(200)
                    .send(responseBody6);
                break;

            case "글로벌 관련해서 알려줘":
                const result7 = await admin
                    .database()
                    .ref('School_Notice/글로벌')
                    .child('title')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const date_result7 = await admin
                    .database()
                    .ref('School_Notice/글로벌')
                    .child('date')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const url_result7 = await admin
                    .database()
                    .ref('School_Notice/글로벌')
                    .child('url')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const responseBody7 = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                "listCard": {
                                    "header": {
                                        "title": "글로벌 공지사항"
                                    },
                                    "items": [
                                        {
                                            "title": result7[0],
                                            "description": date_result7[0],
                                            "link": {
                                                "web": url_result7[0]
                                            }
                                        }, {
                                            "title": result7[1],
                                            "description": date_result7[1],
                                            "link": {
                                                "web": url_result7[1]
                                            }
                                        }, {
                                            "title": result7[2],
                                            "description": date_result7[2],
                                            "link": {
                                                "web": url_result7[2]
                                            }
                                        }, {
                                            "title": result7[3],
                                            "description": date_result7[3],
                                            "link": {
                                                "web": url_result7[3]
                                            }
                                        }, {
                                            "title": result7[4],
                                            "description": date_result7[4],
                                            "link": {
                                                "web": url_result7[4]
                                            }
                                        }
                                    ],
                                    "buttons": [
                                        {
                                            "label": "글로벌 공지사항 페이지",
                                            "action": "webLink",
                                            "webLinkUrl": "https://www.sungkyul.ac.kr/mbs/skukr/jsp/board/list.jsp?boardId=37&id=skukr_06" +
                                                "0106000000"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                };
                res
                    .status(200)
                    .send(responseBody7);
                break;

            case "일반 관련해서 알려줘":
                const result8 = await admin
                    .database()
                    .ref('School_Notice/일반')
                    .child('title')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const date_result8 = await admin
                    .database()
                    .ref('School_Notice/일반')
                    .child('date')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const url_result8 = await admin
                    .database()
                    .ref('School_Notice/일반')
                    .child('url')
                    .once('value')
                    .then(snapshot => {
                        let text = new Array();
                        snapshot.forEach(item => {
                            text.push(item.val());
                        });
                        console.log(text);
                        return text;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                const responseBody8 = {
                    version: "2.0",
                    template: {
                        outputs: [
                            {
                                "listCard": {
                                    "header": {
                                        "title": "일반 공지사항"
                                    },
                                    "items": [
                                        {
                                            "title": result8[0],
                                            "description": date_result8[0],
                                            "link": {
                                                "web": url_result8[0]
                                            }
                                        }, {
                                            "title": result8[1],
                                            "description": date_result8[1],
                                            "link": {
                                                "web": url_result8[1]
                                            }
                                        }, {
                                            "title": result8[2],
                                            "description": date_result8[2],
                                            "link": {
                                                "web": url_result8[2]
                                            }
                                        }, {
                                            "title": result8[3],
                                            "description": date_result8[3],
                                            "link": {
                                                "web": url_result8[3]
                                            }
                                        }, {
                                            "title": result8[4],
                                            "description": date_result8[4],
                                            "link": {
                                                "web": url_result8[4]
                                            }
                                        }
                                    ],
                                    "buttons": [
                                        {
                                            "label": "일반 공지사항 페이지",
                                            "action": "webLink",
                                            "webLinkUrl": "https://www.sungkyul.ac.kr/mbs/skukr/jsp/board/list.jsp?boardId=38&id=skukr_06" +
                                                "0107000000"
                                        }
                                    ]
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