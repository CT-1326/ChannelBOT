const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('POST /school-cafe', () => {
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
            .post('/school-cafe')
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
        /* 테스트 사용자 요청 발화문 추가 */
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "오늘의 학식 안내"
        };
        request(functions.config().test_url.app)
            .post('/school-cafe')
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
                /* 응답 결과 구조가 지정한 데이터 타입인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');
                expect(element.text)
                    .to
                    .be
                    .a('string');
                /* 응답 결과 본문 내용이 지정한 내용인지를 테스트 */
                expect(element.text)
                    .to
                    .include('보고 싶은 오늘의 학식 종류를 선택');
                expect(element.text)
                    .to
                    .include('학생식당');
                expect(element.text)
                    .to
                    .include('위치');
                expect(element.text)
                    .to
                    .include('운영시간');

                const elementQuick = res.body.template.quickReplies;
                // console.log(element);
                /* 바로가기 응답 결과가 지정한 개수, 데이터 타입, 내용인지를 테스트 */
                const array = ["면 종류", "밥 종류", "튀김 종류", "모든 메뉴"];
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