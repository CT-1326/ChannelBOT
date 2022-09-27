const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('POST /school-wifi', () => {
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
            .post('/school-wifi')
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

    /* 테스트 단위 : 채널이 추가되어 서비스를 이용할 때 */
    it('responds isFriend is true', done => {
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "학교 WIFI 연결 안내"
        };
        request(functions.config().test_url.app)
            .post('/school-wifi')
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
                /* 응답 결과 구조가 지정한 데이터 타입, 내용인지를 테스트 */
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
                    .include('본인의 운영체제를 선택');

                const elementQuick = res.body.template.quickReplies;
                // console.log(element);
                const array = ['안드로이드', 'IOS', '윈도우'];
                /* 바로가기 응답 결과가 지정한 개수, 데이터 타입, 내용인지를 테스트 */
                expect(elementQuick)
                    .to
                    .have
                    .lengthOf(array.length);
                for (let index = 0; index < elementQuick.length; index++) {
                    expect(elementQuick[index].action)
                        .to
                        .equal('block');
                    expect(elementQuick[index].label)
                        .to
                        .include(array[index]);
                }
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });
});