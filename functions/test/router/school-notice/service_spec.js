const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('POST /school-cafe/service', () => { // 테스트 수트
    it('responds isFriend is undefined', done => { // 테스트 단위 : 채널 추가가 안되어있을 떄
        const userRequest = { // 기본 사용자 정보 시나리오
            user: {
                "properties": {
                    "isFriend": undefined // 채널 추가 상태
                }
            }
        };
        request(functions.config().test_url.app) // 테스트 하려는 기본 주소
            .post('/school-cafe/service') // 주소의 엔드포인트
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest}) // body 데이터 전송
            .expect(201) // 응답 상태코드
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .simpleText;
                // console.log(element);
                expect(element)
                    .to
                    .be
                    .an('object'); // 응답 결과가 오브젝트 타입인가
                expect(element.text)
                    .to
                    .be
                    .a('string'); // 응답 결과의 텍스트가 문자열 타입인가
                expect(element.text)
                    .to
                    .include("채널봇 채널 추가부터"); // 응답 결과의 텍스트가 작성한 텍스트 내용을 포함하는가
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });

    it(
        'responds isFriend is true and choose 학사',
        done => { // 테스트 단위 : 채널이 추가되었고 학사 메뉴를 선택했을 때
            const userRequest = { // 기본 사용자 정보 시나리오와 요청 발화문
                user: {
                    "properties": {
                        "isFriend": true
                    }
                },
                utterance: "학사 관련해서 알려줘"
            };
            request(functions.config().test_url.app) // 테스트 하려는 기본 주소
                .post('/school-notice/service') // 주소의 엔드포인트
                .set('Accept', 'application/json')
                .type('application/json')
                .send({userRequest}) // body 데이터 전송
                .expect(201) // 응답 상태코드
                .then(res => {
                    const element = res
                        .body
                        .template
                        .outputs[0]
                        .listCard;
                    // console.log(element);
                    expect(element)
                        .to
                        .be
                        .an('object'); // 응답 결과가 오브젝트 타입인가

                    const elementHead = element.header.title;
                    expect(elementHead)
                        .to
                        .be
                        .a('string'); // 응답 결과의 헤더 제목이 문자열 타입인가
                    expect(elementHead)
                        .to
                        .include('학사 공지사항'); // 응답 결과의 헤더 제목이 작성한 텍스트 내용을 포함하는가

                    const elementItems = element.items;
                    // console.log(elementItems);
                    for (let index = 0; index < elementItems.length; index++) {
                        const itemTitle = elementItems[index].title;
                        const itemDescription = elementItems[index].description;
                        const itemLink = elementItems[index].link;
                        // console.log(itemTitle, itemDescription, itemLink);
                        expect(itemTitle)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 제목이 문자열 타입인가
                        expect(itemDescription)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 본문이 문자열 타입인가
                        expect(itemLink)
                            .to
                            .be
                            .an('object'); // 응답 결과의 리스트 본문의 링크가 웹 링크 오브젝트인가
                        expect(itemLink.web)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 웹링크가 문자열 타입인가
                    }

                    const elementButton = element.buttons;
                    // console.log(elementButton);
                    const itemLabel = elementButton[0].label;
                    expect(itemLabel)
                        .to
                        .be
                        .a('string'); // 응답 결과의 리스트 버튼 제목이 문자열 타입인가
                    expect(itemLabel)
                        .to
                        .equal('학사 공지사항 페이지'); // 응답 결과의 리스트 버튼 제목이 작성한 텍스트 내용과 완전일치 하는가
                    const itemAction = elementButton[0].action;
                    expect(itemAction)
                        .to
                        .equal('webLink'); // 응답 결과의 리스트 버튼이 웹링크 인가
                    const itemWebLinkUrl = elementButton[0].webLinkUrl;
                    expect(itemWebLinkUrl)
                        .to
                        .be
                        .a('string'); // 응답 결과의 리스트 버튼 웹 경로가 문자열 타입인가
                    // console.log(itemLabel, itemAction, itemWebLinkUrl);

                    const elementQuick = res
                        .body
                        .template
                        .quickReplies[0];
                    // console.log(elementQuick);
                    expect(elementQuick.messageText)
                        .to
                        .equal('뒤로 돌아갈래'); // 응답 블록의 바로가기 요청문 내용이 작성한 텍스트 내용과 완전 일치하는가
                    expect(elementQuick.action)
                        .to
                        .equal('block'); // 응답 블록의 바로가기 구조가 블록 구조 인가
                    expect(elementQuick.label)
                        .to
                        .include('뒤로가기'); // 응답 블록의 바로가기명이 작성한 텍스트 내용을 포함하는가
                    done();
                })
                .catch(err => {
                    console.error("Error >>", err);
                    done(err);
                });
        }
    );
    it(
        'responds isFriend is true and choose 새소식',
        done => { // 테스트 단위 : 채널이 추가되었고 새소식 메뉴를 선택했을 때
            const userRequest = { // 기본 사용자 정보 시나리오와 요청 발화문
                user: {
                    "properties": {
                        "isFriend": true
                    }
                },
                utterance: "새소식 관련해서 알려줘"
            };
            request(functions.config().test_url.app) // 테스트 하려는 기본 주소
                .post('/school-notice/service') // 주소의 엔드포인트
                .set('Accept', 'application/json')
                .type('application/json')
                .send({userRequest}) // body 데이터 전송
                .expect(201) // 응답 상태코드
                .then(res => {
                    const element = res
                        .body
                        .template
                        .outputs[0]
                        .listCard;
                    // console.log(element);
                    expect(element)
                        .to
                        .be
                        .an('object'); // 응답 결과가 오브젝트 타입인가

                    const elementHead = element.header.title;
                    expect(elementHead)
                        .to
                        .be
                        .a('string'); // 응답 결과의 헤더 제목이 문자열 타입인가
                    expect(elementHead)
                        .to
                        .include('새소식 공지사항'); // 응답 결과의 헤더 제목이 작성한 텍스트 내용을 포함하는가

                    const elementItems = element.items;
                    // console.log(elementItems);
                    for (let index = 0; index < elementItems.length; index++) {
                        const itemTitle = elementItems[index].title;
                        const itemDescription = elementItems[index].description;
                        const itemLink = elementItems[index].link;
                        // console.log(itemTitle, itemDescription, itemLink);
                        expect(itemTitle)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 제목이 문자열 타입인가
                        expect(itemDescription)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 본문이 문자열 타입인가
                        expect(itemLink)
                            .to
                            .be
                            .an('object'); // 응답 결과의 리스트 본문의 링크가 웹 링크 오브젝트인가
                        expect(itemLink.web)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 웹링크가 문자열 타입인가
                    }

                    const elementButton = element.buttons;
                    // console.log(elementButton);
                    const itemLabel = elementButton[0].label;
                    expect(itemLabel)
                        .to
                        .be
                        .a('string'); // 응답 결과의 리스트 버튼 제목이 문자열 타입인가
                    expect(itemLabel)
                        .to
                        .equal('새소식 공지사항 페이지'); // 응답 결과의 리스트 버튼 제목이 작성한 텍스트 내용과 완전일치 하는가
                    const itemAction = elementButton[0].action;
                    expect(itemAction)
                        .to
                        .equal('webLink'); // 응답 결과의 리스트 버튼이 웹링크 인가
                    const itemWebLinkUrl = elementButton[0].webLinkUrl;
                    expect(itemWebLinkUrl)
                        .to
                        .be
                        .a('string'); // 응답 결과의 리스트 버튼 웹 경로가 문자열 타입인가
                    // console.log(itemLabel, itemAction, itemWebLinkUrl);

                    const elementQuick = res
                        .body
                        .template
                        .quickReplies[0];
                    // console.log(elementQuick);
                    expect(elementQuick.messageText)
                        .to
                        .equal('뒤로 돌아갈래'); // 응답 블록의 바로가기 요청문 내용이 작성한 텍스트 내용과 완전 일치하는가
                    expect(elementQuick.action)
                        .to
                        .equal('block'); // 응답 블록의 바로가기 구조가 블록 구조 인가
                    expect(elementQuick.label)
                        .to
                        .include('뒤로가기'); // 응답 블록의 바로가기명이 작성한 텍스트 내용을 포함하는가
                    done();
                })
                .catch(err => {
                    console.error("Error >>", err);
                    done(err);
                });
        }
    );
    it(
        'responds isFriend is true and choose 장학/등록',
        done => { // 테스트 단위 : 채널이 추가되었고 장학/등록 메뉴를 선택했을 때
            const userRequest = { // 기본 사용자 정보 시나리오와 요청 발화문
                user: {
                    "properties": {
                        "isFriend": true
                    }
                },
                utterance: "장학/등록 관련해서 알려줘"
            };
            request(functions.config().test_url.app) // 테스트 하려는 기본 주소
                .post('/school-notice/service') // 주소의 엔드포인트
                .set('Accept', 'application/json')
                .type('application/json')
                .send({userRequest}) // body 데이터 전송
                .expect(201) // 응답 상태코드
                .then(res => {
                    const element = res
                        .body
                        .template
                        .outputs[0]
                        .listCard;
                    // console.log(element);
                    expect(element)
                        .to
                        .be
                        .an('object'); // 응답 결과가 오브젝트 타입인가

                    const elementHead = element.header.title;
                    expect(elementHead)
                        .to
                        .be
                        .a('string'); // 응답 결과의 헤더 제목이 문자열 타입인가
                    expect(elementHead)
                        .to
                        .include('장학/등록 공지사항'); // 응답 결과의 헤더 제목이 작성한 텍스트 내용을 포함하는가

                    const elementItems = element.items;
                    // console.log(elementItems);
                    for (let index = 0; index < elementItems.length; index++) {
                        const itemTitle = elementItems[index].title;
                        const itemDescription = elementItems[index].description;
                        const itemLink = elementItems[index].link;
                        // console.log(itemTitle, itemDescription, itemLink);
                        expect(itemTitle)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 제목이 문자열 타입인가
                        expect(itemDescription)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 본문이 문자열 타입인가
                        expect(itemLink)
                            .to
                            .be
                            .an('object'); // 응답 결과의 리스트 본문의 링크가 웹 링크 오브젝트인가
                        expect(itemLink.web)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 웹링크가 문자열 타입인가
                    }

                    const elementButton = element.buttons;
                    // console.log(elementButton);
                    const itemLabel = elementButton[0].label;
                    expect(itemLabel)
                        .to
                        .be
                        .a('string'); // 응답 결과의 리스트 버튼 제목이 문자열 타입인가
                    expect(itemLabel)
                        .to
                        .equal('장학/등록 공지사항 페이지'); // 응답 결과의 리스트 버튼 제목이 작성한 텍스트 내용과 완전일치 하는가
                    const itemAction = elementButton[0].action;
                    expect(itemAction)
                        .to
                        .equal('webLink'); // 응답 결과의 리스트 버튼이 웹링크 인가
                    const itemWebLinkUrl = elementButton[0].webLinkUrl;
                    expect(itemWebLinkUrl)
                        .to
                        .be
                        .a('string'); // 응답 결과의 리스트 버튼 웹 경로가 문자열 타입인가
                    // console.log(itemLabel, itemAction, itemWebLinkUrl);

                    const elementQuick = res
                        .body
                        .template
                        .quickReplies[0];
                    // console.log(elementQuick);
                    expect(elementQuick.messageText)
                        .to
                        .equal('뒤로 돌아갈래'); // 응답 블록의 바로가기 요청문 내용이 작성한 텍스트 내용과 완전 일치하는가
                    expect(elementQuick.action)
                        .to
                        .equal('block'); // 응답 블록의 바로가기 구조가 블록 구조 인가
                    expect(elementQuick.label)
                        .to
                        .include('뒤로가기'); // 응답 블록의 바로가기명이 작성한 텍스트 내용을 포함하는가
                    done();
                })
                .catch(err => {
                    console.error("Error >>", err);
                    done(err);
                });
        }
    );
    it(
        'responds isFriend is true and choose 입학',
        done => { // 테스트 단위 : 채널이 추가되었고 입학 메뉴를 선택했을 때
            const userRequest = { // 기본 사용자 정보 시나리오와 요청 발화문
                user: {
                    "properties": {
                        "isFriend": true
                    }
                },
                utterance: "입학 관련해서 알려줘"
            };
            request(functions.config().test_url.app) // 테스트 하려는 기본 주소
                .post('/school-notice/service') // 주소의 엔드포인트
                .set('Accept', 'application/json')
                .type('application/json')
                .send({userRequest}) // body 데이터 전송
                .expect(201) // 응답 상태코드
                .then(res => {
                    const element = res
                        .body
                        .template
                        .outputs[0]
                        .listCard;
                    // console.log(element);
                    expect(element)
                        .to
                        .be
                        .an('object'); // 응답 결과가 오브젝트 타입인가

                    const elementHead = element.header.title;
                    expect(elementHead)
                        .to
                        .be
                        .a('string'); // 응답 결과의 헤더 제목이 문자열 타입인가
                    expect(elementHead)
                        .to
                        .include('입학 공지사항'); // 응답 결과의 헤더 제목이 작성한 텍스트 내용을 포함하는가

                    const elementItems = element.items;
                    // console.log(elementItems);
                    for (let index = 0; index < elementItems.length; index++) {
                        const itemTitle = elementItems[index].title;
                        const itemDescription = elementItems[index].description;
                        const itemLink = elementItems[index].link;
                        // console.log(itemTitle, itemDescription, itemLink);
                        expect(itemTitle)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 제목이 문자열 타입인가
                        expect(itemDescription)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 본문이 문자열 타입인가
                        expect(itemLink)
                            .to
                            .be
                            .an('object'); // 응답 결과의 리스트 본문의 링크가 웹 링크 오브젝트인가
                        expect(itemLink.web)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 웹링크가 문자열 타입인가
                    }

                    const elementButton = element.buttons;
                    // console.log(elementButton);
                    const itemLabel = elementButton[0].label;
                    expect(itemLabel)
                        .to
                        .be
                        .a('string'); // 응답 결과의 리스트 버튼 제목이 문자열 타입인가
                    expect(itemLabel)
                        .to
                        .equal('입학 공지사항 페이지'); // 응답 결과의 리스트 버튼 제목이 작성한 텍스트 내용과 완전일치 하는가
                    const itemAction = elementButton[0].action;
                    expect(itemAction)
                        .to
                        .equal('webLink'); // 응답 결과의 리스트 버튼이 웹링크 인가
                    const itemWebLinkUrl = elementButton[0].webLinkUrl;
                    expect(itemWebLinkUrl)
                        .to
                        .be
                        .a('string'); // 응답 결과의 리스트 버튼 웹 경로가 문자열 타입인가
                    // console.log(itemLabel, itemAction, itemWebLinkUrl);

                    const elementQuick = res
                        .body
                        .template
                        .quickReplies[0];
                    // console.log(elementQuick);
                    expect(elementQuick.messageText)
                        .to
                        .equal('뒤로 돌아갈래'); // 응답 블록의 바로가기 요청문 내용이 작성한 텍스트 내용과 완전 일치하는가
                    expect(elementQuick.action)
                        .to
                        .equal('block'); // 응답 블록의 바로가기 구조가 블록 구조 인가
                    expect(elementQuick.label)
                        .to
                        .include('뒤로가기'); // 응답 블록의 바로가기명이 작성한 텍스트 내용을 포함하는가
                    done();
                })
                .catch(err => {
                    console.error("Error >>", err);
                    done(err);
                });
        }
    );
    it(
        'responds isFriend is true and choose 취업',
        done => { // 테스트 단위 : 채널이 추가되었고 취업 메뉴를 선택했을 때
            const userRequest = { // 기본 사용자 정보 시나리오와 요청 발화문
                user: {
                    "properties": {
                        "isFriend": true
                    }
                },
                utterance: "취업 관련해서 알려줘"
            };
            request(functions.config().test_url.app) // 테스트 하려는 기본 주소
                .post('/school-notice/service') // 주소의 엔드포인트
                .set('Accept', 'application/json')
                .type('application/json')
                .send({userRequest}) // body 데이터 전송
                .expect(201) // 응답 상태코드
                .then(res => {
                    const element = res
                        .body
                        .template
                        .outputs[0]
                        .listCard;
                    // console.log(element);
                    expect(element)
                        .to
                        .be
                        .an('object'); // 응답 결과가 오브젝트 타입인가

                    const elementHead = element.header.title;
                    expect(elementHead)
                        .to
                        .be
                        .a('string'); // 응답 결과의 헤더 제목이 문자열 타입인가
                    expect(elementHead)
                        .to
                        .include('취업 공지사항'); // 응답 결과의 헤더 제목이 작성한 텍스트 내용을 포함하는가

                    const elementItems = element.items;
                    // console.log(elementItems);
                    for (let index = 0; index < elementItems.length; index++) {
                        const itemTitle = elementItems[index].title;
                        const itemDescription = elementItems[index].description;
                        const itemLink = elementItems[index].link;
                        // console.log(itemTitle, itemDescription, itemLink);
                        expect(itemTitle)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 제목이 문자열 타입인가
                        expect(itemDescription)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 본문이 문자열 타입인가
                        expect(itemLink)
                            .to
                            .be
                            .an('object'); // 응답 결과의 리스트 본문의 링크가 웹 링크 오브젝트인가
                        expect(itemLink.web)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 웹링크가 문자열 타입인가
                    }

                    const elementButton = element.buttons;
                    // console.log(elementButton);
                    const itemLabel = elementButton[0].label;
                    expect(itemLabel)
                        .to
                        .be
                        .a('string'); // 응답 결과의 리스트 버튼 제목이 문자열 타입인가
                    expect(itemLabel)
                        .to
                        .equal('취업 공지사항 페이지'); // 응답 결과의 리스트 버튼 제목이 작성한 텍스트 내용과 완전일치 하는가
                    const itemAction = elementButton[0].action;
                    expect(itemAction)
                        .to
                        .equal('webLink'); // 응답 결과의 리스트 버튼이 웹링크 인가
                    const itemWebLinkUrl = elementButton[0].webLinkUrl;
                    expect(itemWebLinkUrl)
                        .to
                        .be
                        .a('string'); // 응답 결과의 리스트 버튼 웹 경로가 문자열 타입인가
                    // console.log(itemLabel, itemAction, itemWebLinkUrl);

                    const elementQuick = res
                        .body
                        .template
                        .quickReplies[0];
                    // console.log(elementQuick);
                    expect(elementQuick.messageText)
                        .to
                        .equal('뒤로 돌아갈래'); // 응답 블록의 바로가기 요청문 내용이 작성한 텍스트 내용과 완전 일치하는가
                    expect(elementQuick.action)
                        .to
                        .equal('block'); // 응답 블록의 바로가기 구조가 블록 구조 인가
                    expect(elementQuick.label)
                        .to
                        .include('뒤로가기'); // 응답 블록의 바로가기명이 작성한 텍스트 내용을 포함하는가
                    done();
                })
                .catch(err => {
                    console.error("Error >>", err);
                    done(err);
                });
        }
    );
    it(
        'responds isFriend is true and choose 행사',
        done => { // 테스트 단위 : 채널이 추가되었고 행사 메뉴를 선택했을 때
            const userRequest = { // 기본 사용자 정보 시나리오와 요청 발화문
                user: {
                    "properties": {
                        "isFriend": true
                    }
                },
                utterance: "행사 관련해서 알려줘"
            };
            request(functions.config().test_url.app) // 테스트 하려는 기본 주소
                .post('/school-notice/service') // 주소의 엔드포인트
                .set('Accept', 'application/json')
                .type('application/json')
                .send({userRequest}) // body 데이터 전송
                .expect(201) // 응답 상태코드
                .then(res => {
                    const element = res
                        .body
                        .template
                        .outputs[0]
                        .listCard;
                    // console.log(element);
                    expect(element)
                        .to
                        .be
                        .an('object'); // 응답 결과가 오브젝트 타입인가

                    const elementHead = element.header.title;
                    expect(elementHead)
                        .to
                        .be
                        .a('string'); // 응답 결과의 헤더 제목이 문자열 타입인가
                    expect(elementHead)
                        .to
                        .include('행사 공지사항'); // 응답 결과의 헤더 제목이 작성한 텍스트 내용을 포함하는가

                    const elementItems = element.items;
                    // console.log(elementItems);
                    for (let index = 0; index < elementItems.length; index++) {
                        const itemTitle = elementItems[index].title;
                        const itemDescription = elementItems[index].description;
                        const itemLink = elementItems[index].link;
                        // console.log(itemTitle, itemDescription, itemLink);
                        expect(itemTitle)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 제목이 문자열 타입인가
                        expect(itemDescription)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 본문이 문자열 타입인가
                        expect(itemLink)
                            .to
                            .be
                            .an('object'); // 응답 결과의 리스트 본문의 링크가 웹 링크 오브젝트인가
                        expect(itemLink.web)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 웹링크가 문자열 타입인가
                    }

                    const elementButton = element.buttons;
                    // console.log(elementButton);
                    const itemLabel = elementButton[0].label;
                    expect(itemLabel)
                        .to
                        .be
                        .a('string'); // 응답 결과의 리스트 버튼 제목이 문자열 타입인가
                    expect(itemLabel)
                        .to
                        .equal('행사 공지사항 페이지'); // 응답 결과의 리스트 버튼 제목이 작성한 텍스트 내용과 완전일치 하는가
                    const itemAction = elementButton[0].action;
                    expect(itemAction)
                        .to
                        .equal('webLink'); // 응답 결과의 리스트 버튼이 웹링크 인가
                    const itemWebLinkUrl = elementButton[0].webLinkUrl;
                    expect(itemWebLinkUrl)
                        .to
                        .be
                        .a('string'); // 응답 결과의 리스트 버튼 웹 경로가 문자열 타입인가
                    // console.log(itemLabel, itemAction, itemWebLinkUrl);

                    const elementQuick = res
                        .body
                        .template
                        .quickReplies[0];
                    // console.log(elementQuick);
                    expect(elementQuick.messageText)
                        .to
                        .equal('뒤로 돌아갈래'); // 응답 블록의 바로가기 요청문 내용이 작성한 텍스트 내용과 완전 일치하는가
                    expect(elementQuick.action)
                        .to
                        .equal('block'); // 응답 블록의 바로가기 구조가 블록 구조 인가
                    expect(elementQuick.label)
                        .to
                        .include('뒤로가기'); // 응답 블록의 바로가기명이 작성한 텍스트 내용을 포함하는가
                    done();
                })
                .catch(err => {
                    console.error("Error >>", err);
                    done(err);
                });
        }
    );
    it(
        'responds isFriend is true and choose 글로벌',
        done => { // 테스트 단위 : 채널이 추가되었고 글로벌 메뉴를 선택했을 때
            const userRequest = { // 기본 사용자 정보 시나리오와 요청 발화문
                user: {
                    "properties": {
                        "isFriend": true
                    }
                },
                utterance: "글로벌 관련해서 알려줘"
            };
            request(functions.config().test_url.app) // 테스트 하려는 기본 주소
                .post('/school-notice/service') // 주소의 엔드포인트
                .set('Accept', 'application/json')
                .type('application/json')
                .send({userRequest}) // body 데이터 전송
                .expect(201) // 응답 상태코드
                .then(res => {
                    const element = res
                        .body
                        .template
                        .outputs[0]
                        .listCard;
                    // console.log(element);
                    expect(element)
                        .to
                        .be
                        .an('object'); // 응답 결과가 오브젝트 타입인가

                    const elementHead = element.header.title;
                    expect(elementHead)
                        .to
                        .be
                        .a('string'); // 응답 결과의 헤더 제목이 문자열 타입인가
                    expect(elementHead)
                        .to
                        .include('글로벌 공지사항'); // 응답 결과의 헤더 제목이 작성한 텍스트 내용을 포함하는가

                    const elementItems = element.items;
                    // console.log(elementItems);
                    for (let index = 0; index < elementItems.length; index++) {
                        const itemTitle = elementItems[index].title;
                        const itemDescription = elementItems[index].description;
                        const itemLink = elementItems[index].link;
                        // console.log(itemTitle, itemDescription, itemLink);
                        expect(itemTitle)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 제목이 문자열 타입인가
                        expect(itemDescription)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 본문이 문자열 타입인가
                        expect(itemLink)
                            .to
                            .be
                            .an('object'); // 응답 결과의 리스트 본문의 링크가 웹 링크 오브젝트인가
                        expect(itemLink.web)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 웹링크가 문자열 타입인가
                    }

                    const elementButton = element.buttons;
                    // console.log(elementButton);
                    const itemLabel = elementButton[0].label;
                    expect(itemLabel)
                        .to
                        .be
                        .a('string'); // 응답 결과의 리스트 버튼 제목이 문자열 타입인가
                    expect(itemLabel)
                        .to
                        .equal('글로벌 공지사항 페이지'); // 응답 결과의 리스트 버튼 제목이 작성한 텍스트 내용과 완전일치 하는가
                    const itemAction = elementButton[0].action;
                    expect(itemAction)
                        .to
                        .equal('webLink'); // 응답 결과의 리스트 버튼이 웹링크 인가
                    const itemWebLinkUrl = elementButton[0].webLinkUrl;
                    expect(itemWebLinkUrl)
                        .to
                        .be
                        .a('string'); // 응답 결과의 리스트 버튼 웹 경로가 문자열 타입인가
                    // console.log(itemLabel, itemAction, itemWebLinkUrl);

                    const elementQuick = res
                        .body
                        .template
                        .quickReplies[0];
                    // console.log(elementQuick);
                    expect(elementQuick.messageText)
                        .to
                        .equal('뒤로 돌아갈래'); // 응답 블록의 바로가기 요청문 내용이 작성한 텍스트 내용과 완전 일치하는가
                    expect(elementQuick.action)
                        .to
                        .equal('block'); // 응답 블록의 바로가기 구조가 블록 구조 인가
                    expect(elementQuick.label)
                        .to
                        .include('뒤로가기'); // 응답 블록의 바로가기명이 작성한 텍스트 내용을 포함하는가
                    done();
                })
                .catch(err => {
                    console.error("Error >>", err);
                    done(err);
                });
        }
    );
    it(
        'responds isFriend is true and choose 일반',
        done => { // 테스트 단위 : 채널이 추가되었고 일반 메뉴를 선택했을 때
            const userRequest = { // 기본 사용자 정보 시나리오와 요청 발화문
                user: {
                    "properties": {
                        "isFriend": true
                    }
                },
                utterance: "일반 관련해서 알려줘"
            };
            request(functions.config().test_url.app) // 테스트 하려는 기본 주소
                .post('/school-notice/service') // 주소의 엔드포인트
                .set('Accept', 'application/json')
                .type('application/json')
                .send({userRequest}) // body 데이터 전송
                .expect(201) // 응답 상태코드
                .then(res => {
                    const element = res
                        .body
                        .template
                        .outputs[0]
                        .listCard;
                    // console.log(element);
                    expect(element)
                        .to
                        .be
                        .an('object'); // 응답 결과가 오브젝트 타입인가

                    const elementHead = element.header.title;
                    expect(elementHead)
                        .to
                        .be
                        .a('string'); // 응답 결과의 헤더 제목이 문자열 타입인가
                    expect(elementHead)
                        .to
                        .include('일반 공지사항'); // 응답 결과의 헤더 제목이 작성한 텍스트 내용을 포함하는가

                    const elementItems = element.items;
                    // console.log(elementItems);
                    for (let index = 0; index < elementItems.length; index++) {
                        const itemTitle = elementItems[index].title;
                        const itemDescription = elementItems[index].description;
                        const itemLink = elementItems[index].link;
                        // console.log(itemTitle, itemDescription, itemLink);
                        expect(itemTitle)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 제목이 문자열 타입인가
                        expect(itemDescription)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 본문이 문자열 타입인가
                        expect(itemLink)
                            .to
                            .be
                            .an('object'); // 응답 결과의 리스트 본문의 링크가 웹 링크 오브젝트인가
                        expect(itemLink.web)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 웹링크가 문자열 타입인가
                    }

                    const elementButton = element.buttons;
                    // console.log(elementButton);
                    const itemLabel = elementButton[0].label;
                    expect(itemLabel)
                        .to
                        .be
                        .a('string'); // 응답 결과의 리스트 버튼 제목이 문자열 타입인가
                    expect(itemLabel)
                        .to
                        .equal('일반 공지사항 페이지'); // 응답 결과의 리스트 버튼 제목이 작성한 텍스트 내용과 완전일치 하는가
                    const itemAction = elementButton[0].action;
                    expect(itemAction)
                        .to
                        .equal('webLink'); // 응답 결과의 리스트 버튼이 웹링크 인가
                    const itemWebLinkUrl = elementButton[0].webLinkUrl;
                    expect(itemWebLinkUrl)
                        .to
                        .be
                        .a('string'); // 응답 결과의 리스트 버튼 웹 경로가 문자열 타입인가
                    // console.log(itemLabel, itemAction, itemWebLinkUrl);

                    const elementQuick = res
                        .body
                        .template
                        .quickReplies[0];
                    // console.log(elementQuick);
                    expect(elementQuick.messageText)
                        .to
                        .equal('뒤로 돌아갈래'); // 응답 블록의 바로가기 요청문 내용이 작성한 텍스트 내용과 완전 일치하는가
                    expect(elementQuick.action)
                        .to
                        .equal('block'); // 응답 블록의 바로가기 구조가 블록 구조 인가
                    expect(elementQuick.label)
                        .to
                        .include('뒤로가기'); // 응답 블록의 바로가기명이 작성한 텍스트 내용을 포함하는가
                    done();
                })
                .catch(err => {
                    console.error("Error >>", err);
                    done(err);
                });
        }
    );
    it(
        'responds isFriend is true and choose 비교과',
        done => { // 테스트 단위 : 채널이 추가되었고 비교과 메뉴를 선택했을 때
            const userRequest = { // 기본 사용자 정보 시나리오와 요청 발화문
                user: {
                    "properties": {
                        "isFriend": true
                    }
                },
                utterance: "비교과 관련해서 알려줘"
            };
            request(functions.config().test_url.app) // 테스트 하려는 기본 주소
                .post('/school-notice/service') // 주소의 엔드포인트
                .set('Accept', 'application/json')
                .type('application/json')
                .send({userRequest}) // body 데이터 전송
                .expect(201) // 응답 상태코드
                .then(res => {
                    const element = res
                        .body
                        .template
                        .outputs[0]
                        .listCard;
                    // console.log(element);
                    expect(element)
                        .to
                        .be
                        .an('object'); // 응답 결과가 오브젝트 타입인가

                    const elementHead = element.header.title;
                    expect(elementHead)
                        .to
                        .be
                        .a('string'); // 응답 결과의 헤더 제목이 문자열 타입인가
                    expect(elementHead)
                        .to
                        .include('비교과 공지사항'); // 응답 결과의 헤더 제목이 작성한 텍스트 내용을 포함하는가

                    const elementItems = element.items;
                    // console.log(elementItems);
                    for (let index = 0; index < elementItems.length; index++) {
                        const itemTitle = elementItems[index].title;
                        const itemDescription = elementItems[index].description;
                        const itemLink = elementItems[index].link;
                        // console.log(itemTitle, itemDescription, itemLink);
                        expect(itemTitle)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 제목이 문자열 타입인가
                        expect(itemDescription)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 본문이 문자열 타입인가
                        expect(itemLink)
                            .to
                            .be
                            .an('object'); // 응답 결과의 리스트 본문의 링크가 웹 링크 오브젝트인가
                        expect(itemLink.web)
                            .to
                            .be
                            .a('string'); // 응답 결과의 리스트 웹링크가 문자열 타입인가
                    }

                    const elementButton = element.buttons;
                    // console.log(elementButton);
                    const itemLabel = elementButton[0].label;
                    expect(itemLabel)
                        .to
                        .be
                        .a('string'); // 응답 결과의 리스트 버튼 제목이 문자열 타입인가
                    expect(itemLabel)
                        .to
                        .equal('비교과 공지사항 페이지'); // 응답 결과의 리스트 버튼 제목이 작성한 텍스트 내용과 완전일치 하는가
                    const itemAction = elementButton[0].action;
                    expect(itemAction)
                        .to
                        .equal('webLink'); // 응답 결과의 리스트 버튼이 웹링크 인가
                    const itemWebLinkUrl = elementButton[0].webLinkUrl;
                    expect(itemWebLinkUrl)
                        .to
                        .be
                        .a('string'); // 응답 결과의 리스트 버튼 웹 경로가 문자열 타입인가
                    // console.log(itemLabel, itemAction, itemWebLinkUrl);

                    const elementQuick = res
                        .body
                        .template
                        .quickReplies[0];
                    // console.log(elementQuick);
                    expect(elementQuick.messageText)
                        .to
                        .equal('뒤로 돌아갈래'); // 응답 블록의 바로가기 요청문 내용이 작성한 텍스트 내용과 완전 일치하는가
                    expect(elementQuick.action)
                        .to
                        .equal('block'); // 응답 블록의 바로가기 구조가 블록 구조 인가
                    expect(elementQuick.label)
                        .to
                        .include('뒤로가기'); // 응답 블록의 바로가기명이 작성한 텍스트 내용을 포함하는가
                    done();
                })
                .catch(err => {
                    console.error("Error >>", err);
                    done(err);
                });
        }
    );
});