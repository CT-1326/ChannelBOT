const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('POST /school-wifi/service', () => {
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
            .post('/school-wifi/service')
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

    /* 테스트 단위 : 채널이 추가되었고 안드로이드를 선택했을 때 */
    it('responds isFriend is true and choose android', done => {
        /* 테스트 사용자 요청 발화문 추가 */
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "안드로이드야"
        };
        request(functions.config().test_url.app)
            .post('/school-wifi/service')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .simpleImage;
                // console.log(element);
                /* 응답 결과 구조가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');
                expect(element.imageUrl)
                    .to
                    .be
                    .a('string');
                expect(element.altText)
                    .to
                    .be
                    .a('string');
                expect(element.altText)
                    .to
                    .equal('안드로이드일 때 연결 가이드');

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

    /* 테스트 단위 : 채널이 추가되었고 IOS를 선택했을 때 */
    it('responds isFriend is true and choose android', done => {
        /* 테스트 사용자 요청 발화문 추가 */
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "IOS야"
        };
        request(functions.config().test_url.app)
            .post('/school-wifi/service')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .simpleImage;
                // console.log(element);
                /* 응답 결과 구조가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');
                expect(element.imageUrl)
                    .to
                    .be
                    .a('string');
                expect(element.altText)
                    .to
                    .be
                    .a('string');
                expect(element.altText)
                    .to
                    .equal('IOS일 때 연결 가이드');

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

    /* 테스트 단위 : 채널이 추가되었고 윈도우를 선택했을 때 */
    it('responds isFriend is true and choose android', done => {
        /* 테스트 사용자 요청 발화문 추가 */
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "윈도우야"
        };
        request(functions.config().test_url.app)
            .post('/school-wifi/service')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .simpleImage;
                // console.log(element);
                /* 응답 결과 구조가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');
                expect(element.imageUrl)
                    .to
                    .be
                    .a('string');
                expect(element.altText)
                    .to
                    .be
                    .a('string');
                expect(element.altText)
                    .to
                    .equal('윈도우일 때 연결 가이드');

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