const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('POST /school-notice/service', () => {
    /* 테스트 단위 : 채널 추가가 안되어있을 떄 */
    it('responds isFriend is undefined', done => {
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": undefined
                }
            }
        };
        request(functions.config().test_url.app)
            .post('/school-notice/service')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .simpleText;
                // console.log(element);
                /* 응답 결과가 지정한 데이터 타입이자 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');
                expect(element.text)
                    .to
                    .be
                    .a('string');
                expect(element.text)
                    .to
                    .include("채널봇 채널 추가부터");
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });

    /* 테스트 단위 : 채널이 추가되었고 학사 메뉴를 선택했을 때 */
    it('responds isFriend is true and choose 학사', done => {
        /* 테스트 사용자 요청 발화문 추가 */
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "학사 관련해서 알려줘"
        };
        request(functions.config().test_url.app)
            .post('/school-notice/service')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .listCard;
                // console.log(element);
                /* 응답 결과 구조가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');

                const elementHead = element.header.title;
                expect(elementHead)
                    .to
                    .be
                    .a('string');
                expect(elementHead)
                    .to
                    .include('학사 공지사항');

                const elementItems = element.items;
                // console.log(elementItems);
                /* 본문 내용 응답 결과가 지정한 데이터 타입인지를 테스트 */
                for (let index = 0; index < elementItems.length; index++) {
                    const itemTitle = elementItems[index].title;
                    const itemDescription = elementItems[index].description;
                    const itemLink = elementItems[index].link;
                    // console.log(itemTitle, itemDescription, itemLink);
                    expect(itemTitle)
                        .to
                        .be
                        .a('string');
                    expect(itemDescription)
                        .to
                        .be
                        .a('string');
                    expect(itemLink)
                        .to
                        .be
                        .an('object');
                    expect(itemLink.web)
                        .to
                        .be
                        .a('string');
                }

                /* 페이지 바로가기 버튼 응답 결과가 지정한 데이터 타입, 내용인지를 테스트 */
                const elementButton = element.buttons;
                // console.log(elementButton);
                const itemLabel = elementButton[0].label;
                expect(itemLabel)
                    .to
                    .be
                    .a('string');
                expect(itemLabel)
                    .to
                    .equal('학사 공지사항 페이지');
                const itemAction = elementButton[0].action;
                expect(itemAction)
                    .to
                    .equal('webLink');
                const itemWebLinkUrl = elementButton[0].webLinkUrl;
                expect(itemWebLinkUrl)
                    .to
                    .be
                    .a('string');
                // console.log(itemLabel, itemAction, itemWebLinkUrl);

                /* 뒤로가기 응답 결과가 지정한 내용, 데이터 타입인지릍 테스트 */
                const elementQuick = res
                    .body
                    .template
                    .quickReplies[0];
                // console.log(elementQuick);
                expect(elementQuick.messageText)
                    .to
                    .equal('뒤로 돌아갈래');
                expect(elementQuick.action)
                    .to
                    .equal('block');
                expect(elementQuick.label)
                    .to
                    .include('뒤로가기');
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });

    /* 테스트 단위 : 채널이 추가되었고 새소식 메뉴를 선택했을 때 */
    it('responds isFriend is true and choose 새소식', done => {
        /* 테스트 사용자 요청 발화문 추가 */
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "새소식 관련해서 알려줘"
        };
        request(functions.config().test_url.app)
            .post('/school-notice/service')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .listCard;
                // console.log(element);
                /* 응답 결과 구조가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');

                const elementHead = element.header.title;
                expect(elementHead)
                    .to
                    .be
                    .a('string');
                expect(elementHead)
                    .to
                    .include('새소식 공지사항');

                const elementItems = element.items;
                // console.log(elementItems);
                /* 본문 내용 응답 결과가 지정한 데이터 타입인지를 테스트 */
                for (let index = 0; index < elementItems.length; index++) {
                    const itemTitle = elementItems[index].title;
                    const itemDescription = elementItems[index].description;
                    const itemLink = elementItems[index].link;
                    // console.log(itemTitle, itemDescription, itemLink);
                    expect(itemTitle)
                        .to
                        .be
                        .a('string');
                    expect(itemDescription)
                        .to
                        .be
                        .a('string');
                    expect(itemLink)
                        .to
                        .be
                        .an('object');
                    expect(itemLink.web)
                        .to
                        .be
                        .a('string');
                }

                /* 페이지 바로가기 버튼 응답 결과가 지정한 데이터 타입, 내용인지를 테스트 */
                const elementButton = element.buttons;
                // console.log(elementButton);
                const itemLabel = elementButton[0].label;
                expect(itemLabel)
                    .to
                    .be
                    .a('string');
                expect(itemLabel)
                    .to
                    .equal('새소식 공지사항 페이지');
                const itemAction = elementButton[0].action;
                expect(itemAction)
                    .to
                    .equal('webLink');
                const itemWebLinkUrl = elementButton[0].webLinkUrl;
                expect(itemWebLinkUrl)
                    .to
                    .be
                    .a('string');
                // console.log(itemLabel, itemAction, itemWebLinkUrl);

                /* 뒤로가기 응답 결과가 지정한 내용, 데이터 타입인지릍 테스트 */
                const elementQuick = res
                    .body
                    .template
                    .quickReplies[0];
                // console.log(elementQuick);
                expect(elementQuick.messageText)
                    .to
                    .equal('뒤로 돌아갈래');
                expect(elementQuick.action)
                    .to
                    .equal('block');
                expect(elementQuick.label)
                    .to
                    .include('뒤로가기');
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });

    /* 테스트 단위 : 채널이 추가되었고 장학/등록 메뉴를 선택했을 때 */
    it('responds isFriend is true and choose 장학/등록', done => {
        /* 테스트 사용자 요청 발화문 추가 */
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "장학/등록 관련해서 알려줘"
        };
        request(functions.config().test_url.app)
            .post('/school-notice/service')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .listCard;
                // console.log(element);
                /* 응답 결과 구조가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');

                const elementHead = element.header.title;
                expect(elementHead)
                    .to
                    .be
                    .a('string');
                expect(elementHead)
                    .to
                    .include('장학/등록 공지사항');

                const elementItems = element.items;
                // console.log(elementItems);
                /* 본문 내용 응답 결과가 지정한 데이터 타입인지를 테스트 */
                for (let index = 0; index < elementItems.length; index++) {
                    const itemTitle = elementItems[index].title;
                    const itemDescription = elementItems[index].description;
                    const itemLink = elementItems[index].link;
                    // console.log(itemTitle, itemDescription, itemLink);
                    expect(itemTitle)
                        .to
                        .be
                        .a('string');
                    expect(itemDescription)
                        .to
                        .be
                        .a('string');
                    expect(itemLink)
                        .to
                        .be
                        .an('object');
                    expect(itemLink.web)
                        .to
                        .be
                        .a('string');
                }

                /* 페이지 바로가기 버튼 응답 결과가 지정한 데이터 타입, 내용인지를 테스트 */
                const elementButton = element.buttons;
                // console.log(elementButton);
                const itemLabel = elementButton[0].label;
                expect(itemLabel)
                    .to
                    .be
                    .a('string');
                expect(itemLabel)
                    .to
                    .equal('장학/등록 공지사항 페이지');
                const itemAction = elementButton[0].action;
                expect(itemAction)
                    .to
                    .equal('webLink');
                const itemWebLinkUrl = elementButton[0].webLinkUrl;
                expect(itemWebLinkUrl)
                    .to
                    .be
                    .a('string');
                // console.log(itemLabel, itemAction, itemWebLinkUrl);

                /* 뒤로가기 응답 결과가 지정한 내용, 데이터 타입인지릍 테스트 */
                const elementQuick = res
                    .body
                    .template
                    .quickReplies[0];
                // console.log(elementQuick);
                expect(elementQuick.messageText)
                    .to
                    .equal('뒤로 돌아갈래');
                expect(elementQuick.action)
                    .to
                    .equal('block');
                expect(elementQuick.label)
                    .to
                    .include('뒤로가기');
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });

    /* 테스트 단위 : 채널이 추가되었고 입학 메뉴를 선택했을 때 */
    it('responds isFriend is true and choose 입학', done => {
        /* 테스트 사용자 요청 발화문 추가 */
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "입학 관련해서 알려줘"
        };
        request(functions.config().test_url.app)
            .post('/school-notice/service')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .listCard;
                // console.log(element);
                /* 응답 결과 구조가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');

                const elementHead = element.header.title;
                expect(elementHead)
                    .to
                    .be
                    .a('string');
                expect(elementHead)
                    .to
                    .include('입학 공지사항');

                const elementItems = element.items;
                // console.log(elementItems);
                /* 본문 내용 응답 결과가 지정한 데이터 타입인지를 테스트 */
                for (let index = 0; index < elementItems.length; index++) {
                    const itemTitle = elementItems[index].title;
                    const itemDescription = elementItems[index].description;
                    const itemLink = elementItems[index].link;
                    // console.log(itemTitle, itemDescription, itemLink);
                    expect(itemTitle)
                        .to
                        .be
                        .a('string');
                    expect(itemDescription)
                        .to
                        .be
                        .a('string');
                    expect(itemLink)
                        .to
                        .be
                        .an('object');
                    expect(itemLink.web)
                        .to
                        .be
                        .a('string');
                }

                /* 페이지 바로가기 버튼 응답 결과가 지정한 데이터 타입, 내용인지를 테스트 */
                const elementButton = element.buttons;
                // console.log(elementButton);
                const itemLabel = elementButton[0].label;
                expect(itemLabel)
                    .to
                    .be
                    .a('string');
                expect(itemLabel)
                    .to
                    .equal('입학 공지사항 페이지');
                const itemAction = elementButton[0].action;
                expect(itemAction)
                    .to
                    .equal('webLink');
                const itemWebLinkUrl = elementButton[0].webLinkUrl;
                expect(itemWebLinkUrl)
                    .to
                    .be
                    .a('string');
                // console.log(itemLabel, itemAction, itemWebLinkUrl);

                /* 뒤로가기 응답 결과가 지정한 내용, 데이터 타입인지릍 테스트 */
                const elementQuick = res
                    .body
                    .template
                    .quickReplies[0];
                // console.log(elementQuick);
                expect(elementQuick.messageText)
                    .to
                    .equal('뒤로 돌아갈래');
                expect(elementQuick.action)
                    .to
                    .equal('block');
                expect(elementQuick.label)
                    .to
                    .include('뒤로가기');
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });

    /* 테스트 단위 : 채널이 추가되었고 취업 메뉴를 선택했을 때 */
    it('responds isFriend is true and choose 취업', done => {
        /* 테스트 사용자 요청 발화문 추가 */
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "취업 관련해서 알려줘"
        };
        request(functions.config().test_url.app)
            .post('/school-notice/service')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .listCard;
                // console.log(element);
                /* 응답 결과 구조가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');

                const elementHead = element.header.title;
                expect(elementHead)
                    .to
                    .be
                    .a('string');
                expect(elementHead)
                    .to
                    .include('취업 공지사항');

                const elementItems = element.items;
                // console.log(elementItems);
                /* 본문 내용 응답 결과가 지정한 데이터 타입인지를 테스트 */
                for (let index = 0; index < elementItems.length; index++) {
                    const itemTitle = elementItems[index].title;
                    const itemDescription = elementItems[index].description;
                    const itemLink = elementItems[index].link;
                    // console.log(itemTitle, itemDescription, itemLink);
                    expect(itemTitle)
                        .to
                        .be
                        .a('string');
                    expect(itemDescription)
                        .to
                        .be
                        .a('string');
                    expect(itemLink)
                        .to
                        .be
                        .an('object');
                    expect(itemLink.web)
                        .to
                        .be
                        .a('string');
                }

                /* 페이지 바로가기 버튼 응답 결과가 지정한 데이터 타입, 내용인지를 테스트 */
                const elementButton = element.buttons;
                // console.log(elementButton);
                const itemLabel = elementButton[0].label;
                expect(itemLabel)
                    .to
                    .be
                    .a('string');
                expect(itemLabel)
                    .to
                    .equal('취업 공지사항 페이지');
                const itemAction = elementButton[0].action;
                expect(itemAction)
                    .to
                    .equal('webLink');
                const itemWebLinkUrl = elementButton[0].webLinkUrl;
                expect(itemWebLinkUrl)
                    .to
                    .be
                    .a('string');
                // console.log(itemLabel, itemAction, itemWebLinkUrl);

                /* 뒤로가기 응답 결과가 지정한 내용, 데이터 타입인지릍 테스트 */
                const elementQuick = res
                    .body
                    .template
                    .quickReplies[0];
                // console.log(elementQuick);
                expect(elementQuick.messageText)
                    .to
                    .equal('뒤로 돌아갈래');
                expect(elementQuick.action)
                    .to
                    .equal('block');
                expect(elementQuick.label)
                    .to
                    .include('뒤로가기');
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });

    /* 테스트 단위 : 채널이 추가되었고 행사 메뉴를 선택했을 때 */
    it('responds isFriend is true and choose 행사', done => {
        /* 테스트 사용자 요청 발화문 추가 */
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "행사 관련해서 알려줘"
        };
        request(functions.config().test_url.app)
            .post('/school-notice/service')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .listCard;
                // console.log(element);
                /* 응답 결과 구조가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');

                const elementHead = element.header.title;
                expect(elementHead)
                    .to
                    .be
                    .a('string');
                expect(elementHead)
                    .to
                    .include('행사 공지사항');

                const elementItems = element.items;
                // console.log(elementItems);
                /* 본문 내용 응답 결과가 지정한 데이터 타입인지를 테스트 */
                for (let index = 0; index < elementItems.length; index++) {
                    const itemTitle = elementItems[index].title;
                    const itemDescription = elementItems[index].description;
                    const itemLink = elementItems[index].link;
                    // console.log(itemTitle, itemDescription, itemLink);
                    expect(itemTitle)
                        .to
                        .be
                        .a('string');
                    expect(itemDescription)
                        .to
                        .be
                        .a('string');
                    expect(itemLink)
                        .to
                        .be
                        .an('object');
                    expect(itemLink.web)
                        .to
                        .be
                        .a('string');
                }

                /* 페이지 바로가기 버튼 응답 결과가 지정한 데이터 타입, 내용인지를 테스트 */
                const elementButton = element.buttons;
                // console.log(elementButton);
                const itemLabel = elementButton[0].label;
                expect(itemLabel)
                    .to
                    .be
                    .a('string');
                expect(itemLabel)
                    .to
                    .equal('행사 공지사항 페이지');
                const itemAction = elementButton[0].action;
                expect(itemAction)
                    .to
                    .equal('webLink');
                const itemWebLinkUrl = elementButton[0].webLinkUrl;
                expect(itemWebLinkUrl)
                    .to
                    .be
                    .a('string');
                // console.log(itemLabel, itemAction, itemWebLinkUrl);

                /* 뒤로가기 응답 결과가 지정한 내용, 데이터 타입인지릍 테스트 */
                const elementQuick = res
                    .body
                    .template
                    .quickReplies[0];
                // console.log(elementQuick);
                expect(elementQuick.messageText)
                    .to
                    .equal('뒤로 돌아갈래');
                expect(elementQuick.action)
                    .to
                    .equal('block');
                expect(elementQuick.label)
                    .to
                    .include('뒤로가기');
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });

    /* 테스트 단위 : 채널이 추가되었고 글로벌 메뉴를 선택했을 때 */
    it('responds isFriend is true and choose 글로벌', done => {
        /* 테스트 사용자 요청 발화문 추가 */
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "글로벌 관련해서 알려줘"
        };
        request(functions.config().test_url.app)
            .post('/school-notice/service')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .listCard;
                // console.log(element);
                /* 응답 결과 구조가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');

                const elementHead = element.header.title;
                expect(elementHead)
                    .to
                    .be
                    .a('string');
                expect(elementHead)
                    .to
                    .include('글로벌 공지사항');

                const elementItems = element.items;
                // console.log(elementItems);
                /* 본문 내용 응답 결과가 지정한 데이터 타입인지를 테스트 */
                for (let index = 0; index < elementItems.length; index++) {
                    const itemTitle = elementItems[index].title;
                    const itemDescription = elementItems[index].description;
                    const itemLink = elementItems[index].link;
                    // console.log(itemTitle, itemDescription, itemLink);
                    expect(itemTitle)
                        .to
                        .be
                        .a('string');
                    expect(itemDescription)
                        .to
                        .be
                        .a('string');
                    expect(itemLink)
                        .to
                        .be
                        .an('object');
                    expect(itemLink.web)
                        .to
                        .be
                        .a('string');
                }

                /* 페이지 바로가기 버튼 응답 결과가 지정한 데이터 타입, 내용인지를 테스트 */
                const elementButton = element.buttons;
                // console.log(elementButton);
                const itemLabel = elementButton[0].label;
                expect(itemLabel)
                    .to
                    .be
                    .a('string');
                expect(itemLabel)
                    .to
                    .equal('글로벌 공지사항 페이지');
                const itemAction = elementButton[0].action;
                expect(itemAction)
                    .to
                    .equal('webLink');
                const itemWebLinkUrl = elementButton[0].webLinkUrl;
                expect(itemWebLinkUrl)
                    .to
                    .be
                    .a('string');
                // console.log(itemLabel, itemAction, itemWebLinkUrl);

                /* 뒤로가기 응답 결과가 지정한 내용, 데이터 타입인지릍 테스트 */
                const elementQuick = res
                    .body
                    .template
                    .quickReplies[0];
                // console.log(elementQuick);
                expect(elementQuick.messageText)
                    .to
                    .equal('뒤로 돌아갈래');
                expect(elementQuick.action)
                    .to
                    .equal('block');
                expect(elementQuick.label)
                    .to
                    .include('뒤로가기');
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });

    /* 테스트 단위 : 채널이 추가되었고 일반 메뉴를 선택했을 때 */
    it('responds isFriend is true and choose 일반', done => {
        /* 테스트 사용자 요청 발화문 추가 */
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "일반 관련해서 알려줘"
        };
        request(functions.config().test_url.app)
            .post('/school-notice/service')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .listCard;
                // console.log(element);
                /* 응답 결과 구조가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');

                const elementHead = element.header.title;
                expect(elementHead)
                    .to
                    .be
                    .a('string');
                expect(elementHead)
                    .to
                    .include('일반 공지사항');

                const elementItems = element.items;
                // console.log(elementItems);
                /* 본문 내용 응답 결과가 지정한 데이터 타입인지를 테스트 */
                for (let index = 0; index < elementItems.length; index++) {
                    const itemTitle = elementItems[index].title;
                    const itemDescription = elementItems[index].description;
                    const itemLink = elementItems[index].link;
                    // console.log(itemTitle, itemDescription, itemLink);
                    expect(itemTitle)
                        .to
                        .be
                        .a('string');
                    expect(itemDescription)
                        .to
                        .be
                        .a('string');
                    expect(itemLink)
                        .to
                        .be
                        .an('object');
                    expect(itemLink.web)
                        .to
                        .be
                        .a('string');
                }

                /* 페이지 바로가기 버튼 응답 결과가 지정한 데이터 타입, 내용인지를 테스트 */
                const elementButton = element.buttons;
                // console.log(elementButton);
                const itemLabel = elementButton[0].label;
                expect(itemLabel)
                    .to
                    .be
                    .a('string');
                expect(itemLabel)
                    .to
                    .equal('일반 공지사항 페이지');
                const itemAction = elementButton[0].action;
                expect(itemAction)
                    .to
                    .equal('webLink');
                const itemWebLinkUrl = elementButton[0].webLinkUrl;
                expect(itemWebLinkUrl)
                    .to
                    .be
                    .a('string');
                // console.log(itemLabel, itemAction, itemWebLinkUrl);

                /* 뒤로가기 응답 결과가 지정한 내용, 데이터 타입인지릍 테스트 */
                const elementQuick = res
                    .body
                    .template
                    .quickReplies[0];
                // console.log(elementQuick);
                expect(elementQuick.messageText)
                    .to
                    .equal('뒤로 돌아갈래');
                expect(elementQuick.action)
                    .to
                    .equal('block');
                expect(elementQuick.label)
                    .to
                    .include('뒤로가기');
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });

    /* 테스트 단위 : 채널이 추가되었고 비교과 메뉴를 선택했을 때 */
    it('responds isFriend is true and choose 비교과', done => {
        /* 테스트 사용자 요청 발화문 추가 */
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "비교과 관련해서 알려줘"
        };
        request(functions.config().test_url.app)
            .post('/school-notice/service')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .listCard;
                // console.log(element);
                /* 응답 결과 구조가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');

                const elementHead = element.header.title;
                expect(elementHead)
                    .to
                    .be
                    .a('string');
                expect(elementHead)
                    .to
                    .include('비교과 공지사항');

                const elementItems = element.items;
                // console.log(elementItems);
                /* 본문 내용 응답 결과가 지정한 데이터 타입인지를 테스트 */
                for (let index = 0; index < elementItems.length; index++) {
                    const itemTitle = elementItems[index].title;
                    const itemDescription = elementItems[index].description;
                    const itemLink = elementItems[index].link;
                    // console.log(itemTitle, itemDescription, itemLink);
                    expect(itemTitle)
                        .to
                        .be
                        .a('string');
                    expect(itemDescription)
                        .to
                        .be
                        .a('string');
                    expect(itemLink)
                        .to
                        .be
                        .an('object');
                    expect(itemLink.web)
                        .to
                        .be
                        .a('string');
                }

                /* 페이지 바로가기 버튼 응답 결과가 지정한 데이터 타입, 내용인지를 테스트 */
                const elementButton = element.buttons;
                // console.log(elementButton);
                const itemLabel = elementButton[0].label;
                expect(itemLabel)
                    .to
                    .be
                    .a('string');
                expect(itemLabel)
                    .to
                    .equal('비교과 공지사항 페이지');
                const itemAction = elementButton[0].action;
                expect(itemAction)
                    .to
                    .equal('webLink');
                const itemWebLinkUrl = elementButton[0].webLinkUrl;
                expect(itemWebLinkUrl)
                    .to
                    .be
                    .a('string');
                // console.log(itemLabel, itemAction, itemWebLinkUrl);

                /* 뒤로가기 응답 결과가 지정한 내용, 데이터 타입인지릍 테스트 */
                const elementQuick = res
                    .body
                    .template
                    .quickReplies[0];
                // console.log(elementQuick);
                expect(elementQuick.messageText)
                    .to
                    .equal('뒤로 돌아갈래');
                expect(elementQuick.action)
                    .to
                    .equal('block');
                expect(elementQuick.label)
                    .to
                    .include('뒤로가기');
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });
});