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
        'responds isFriend is true and choose noodel',
        done => { // 테스트 단위 : 채널이 추가되었고 면 종류를 선택했을 때
            const userRequest = { // 기본 사용자 정보 시나리오와 요청 발화문
                user: {
                    "properties": {
                        "isFriend": true
                    }
                },
                utterance: "면 종류 메뉴를 알려줘"
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
                        .itemCard;
                    // console.log(element);
                    expect(element)
                        .to
                        .be
                        .an('object'); // 응답 결과가 오브젝트 타입인가

                    const elementHead = element.head.title;
                    expect(elementHead)
                        .to
                        .be
                        .a('string'); // 응답 결과의 헤더 제목이 문자열 타입인가
                    expect(elementHead)
                        .to
                        .include('면 종류'); // 응답 결과의 헤더 제목이 작성한 텍스트 내용을 포함하는가

                    const elementItems = element.itemList;
                    // console.log(elementItems);
                    for (let index = 0; index < elementItems.length; index++) {
                        const itemTitle = elementItems[index].title;
                        const itemDescription = elementItems[index].description;
                        // console.log(itemTitle, itemDescription);
                        expect(itemTitle)
                            .to
                            .be
                            .a('number'); // 응답 결과의 아이템 제목이 숫자 타입인가
                        expect(itemDescription)
                            .to
                            .be
                            .a('string'); // 응답 결과의 아이템 본문이 문자열 타입인가
                    }

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
        'responds isFriend is true and choose rice',
        done => { // 테스트 단위 : 채널이 추가되었고 밥 종류를 선택했을 때
            const userRequest = { // 기본 사용자 정보 시나리오와 요청 발화문
                user: {
                    "properties": {
                        "isFriend": true
                    }
                },
                utterance: "밥 종류 메뉴를 알려줘"
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
                        .itemCard;
                    // console.log(element);
                    expect(element)
                        .to
                        .be
                        .an('object'); // 응답 결과가 오브젝트 타입인가

                    const elementHead = element.head.title;
                    expect(elementHead)
                        .to
                        .be
                        .a('string'); // 응답 결과의 헤더 제목이 문자열 타입인가
                    expect(elementHead)
                        .to
                        .include('밥 종류'); // 응답 결과의 헤더 제목이 작성한 텍스트 내용을 포함하는가

                    const elementItems = element.itemList;
                    // console.log(elementItems);
                    for (let index = 0; index < elementItems.length; index++) {
                        const itemTitle = elementItems[index].title;
                        const itemDescription = elementItems[index].description;
                        // console.log(itemTitle, itemDescription);
                        expect(itemTitle)
                            .to
                            .be
                            .a('number'); // 응답 결과의 아이템 제목이 숫자 타입인가
                        expect(itemDescription)
                            .to
                            .be
                            .a('string'); // 응답 결과의 아이템 본문이 문자열 타입인가
                    }

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
        'responds isFriend is true and choose fried',
        done => { // 테스트 단위 : 채널이 추가되었고 튀김 종류를 선택했을 때
            const userRequest = { // 기본 사용자 정보 시나리오와 요청 발화문
                user: {
                    "properties": {
                        "isFriend": true
                    }
                },
                utterance: "튀김 종류 메뉴를 알려줘"
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
                        .itemCard;
                    // console.log(element);
                    expect(element)
                        .to
                        .be
                        .an('object'); // 응답 결과가 오브젝트 타입인가

                    const elementHead = element.head.title;
                    expect(elementHead)
                        .to
                        .be
                        .a('string'); // 응답 결과의 헤더 제목이 문자열 타입인가
                    expect(elementHead)
                        .to
                        .include('튀김 종류'); // 응답 결과의 헤더 제목이 작성한 텍스트 내용을 포함하는가

                    const elementItems = element.itemList;
                    // console.log(elementItems);
                    for (let index = 0; index < elementItems.length; index++) {
                        const itemTitle = elementItems[index].title;
                        const itemDescription = elementItems[index].description;
                        // console.log(itemTitle, itemDescription);
                        expect(itemTitle)
                            .to
                            .be
                            .a('number'); // 응답 결과의 아이템 제목이 숫자 타입인가
                        expect(itemDescription)
                            .to
                            .be
                            .a('string'); // 응답 결과의 아이템 본문이 문자열 타입인가
                    }

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
        'responds isFriend is true and choose all',
        done => { // 테스트 단위 : 채널이 추가되었고 모든 메뉴를 선택했을 때
            const userRequest = { // 기본 사용자 정보 시나리오와 요청 발화문
                user: {
                    "properties": {
                        "isFriend": true
                    }
                },
                utterance: "모든 메뉴를 알려줘"
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
                        .outputs[0];
                    console.log(element);
                    expect(element)
                        .to
                        .be
                        .an('object'); // 응답 결과가 오브젝트 타입인가

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