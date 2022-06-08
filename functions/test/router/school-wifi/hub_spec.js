const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('POST /school-wifi', () => { // 테스트 수트
    it('responds isFriend is undefined', done => { // 테스트 단위 : 채널 추가가 안되어있을 떄
        const userRequest = { // 기본 사용자 정보 시나리오
            user: {
                "properties": {
                    "isFriend": undefined // 채널 추가 상태
                }
            }
        };
        request(functions.config().test_url.app) // 테스트 하려는 기본 주소
            .post('/school-wifi') // 주소의 엔드포인트
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

    it('responds isFriend is true', done => { // 테스트 단위 : 채널이 추가되어 서비스를 이용할 때
        const userRequest = { // 기본 사용자 정보 시나리오와 요청 발화문
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "학교 WIFI 연결 안내"
        };
        request(functions.config().test_url.app) // 테스트 하려는 기본 주소
            .post('/school-wifi') // 주소의 엔드포인트
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
                expect(element.text)
                    .to
                    .be
                    .a('string'); // 응답 블록의 본문이 문자열 타입인가
                expect(element.text)
                    .to
                    .include('본인의 운영체제를 선택'); // 응답 블록의 본문이 작성한 텍스트 내용을 포함하는가

                const elementQuick = res.body.template.quickReplies;
                // console.log(element);
                const array = ['안드로이드', 'IOS', '윈도우'];
                expect(elementQuick)
                    .to
                    .have
                    .lengthOf(array.length); // 응답 블록의 바로가기 개수가 지정한 배열 사이즈 만큼인가
                for (let index = 0; index < elementQuick.length; index++) {
                    expect(elementQuick[index].action)
                        .to
                        .equal('block'); // 응답 블록의 바로가기가 블록 타입인가
                    expect(elementQuick[index].label)
                        .to
                        .include(array[index]); // 응답 블록의 바로가기 버튼명이 지정한 배열 내용을 포함하는가
                }
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });
});