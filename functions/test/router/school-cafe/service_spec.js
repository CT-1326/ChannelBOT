const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('POST /school-cafe/service', () => {
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
            .post('/school-cafe/service')
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

    /* 테스트 단위 : 채널이 추가되었고 면 종류를 선택했을 때 */
    it('responds isFriend is true and choose noodel', done => {
        /* 테스트 사용자 요청 발화문 추가 */
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "면 종류 메뉴를 알려줘"
        };
        request(functions.config().test_url.app)
            .post('/school-cafe/service')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .itemCard;
                // console.log(element);
                /* 응답 결과 구조가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');

                const elementHead = element.head.title;
                expect(elementHead)
                    .to
                    .be
                    .a('string');
                expect(elementHead)
                    .to
                    .include('면 종류');

                const elementItems = element.itemList;
                // console.log(elementItems);
                /* 본문 내용 응답 결과가 지정한 데이터 타입인지를 테스트 */
                for (let index = 0; index < elementItems.length; index++) {
                    const itemTitle = elementItems[index].title;
                    const itemDescription = elementItems[index].description;
                    // console.log(itemTitle, itemDescription);
                    expect(itemTitle)
                        .to
                        .be
                        .a('number');
                    expect(itemDescription)
                        .to
                        .be
                        .a('string');
                }

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

    /* 테스트 단위 : 채널이 추가되었고 밥 종류를 선택했을 때 */
    it('responds isFriend is true and choose rice', done => {
        /* 테스트 사용자 요청 발화문 추가 */
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "밥 종류 메뉴를 알려줘"
        };
        request(functions.config().test_url.app)
            .post('/school-cafe/service')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .itemCard;
                // console.log(element);
                /* 응답 결과 구조와 헤더가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');

                const elementHead = element.head.title;
                expect(elementHead)
                    .to
                    .be
                    .a('string');
                expect(elementHead)
                    .to
                    .include('밥 종류');

                const elementItems = element.itemList;
                // console.log(elementItems);
                /* 본문 내용 응답 결과가 지정한 데이터 타입인지를 테스트 */
                for (let index = 0; index < elementItems.length; index++) {
                    const itemTitle = elementItems[index].title;
                    const itemDescription = elementItems[index].description;
                    // console.log(itemTitle, itemDescription);
                    expect(itemTitle)
                        .to
                        .be
                        .a('number');
                    expect(itemDescription)
                        .to
                        .be
                        .a('string');
                }

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

    /* 테스트 단위 : 채널이 추가되었고 튀김 종류를 선택했을 때 */
    it('responds isFriend is true and choose fried', done => {
        /* 테스트 사용자 요청 발화문 추가 */
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "튀김 종류 메뉴를 알려줘"
        };
        request(functions.config().test_url.app)
            .post('/school-cafe/service')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .itemCard;
                // console.log(element);
                /* 응답 결과 구조와 헤더가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');

                const elementHead = element.head.title;
                expect(elementHead)
                    .to
                    .be
                    .a('string');
                expect(elementHead)
                    .to
                    .include('튀김 종류');

                const elementItems = element.itemList;
                // console.log(elementItems);
                /* 본문 내용 응답 결과가 지정한 데이터 타입인지를 테스트 */
                for (let index = 0; index < elementItems.length; index++) {
                    const itemTitle = elementItems[index].title;
                    const itemDescription = elementItems[index].description;
                    // console.log(itemTitle, itemDescription);
                    expect(itemTitle)
                        .to
                        .be
                        .a('number');
                    expect(itemDescription)
                        .to
                        .be
                        .a('string');
                }

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