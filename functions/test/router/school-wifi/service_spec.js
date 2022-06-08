const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('POST /school-wifi/service', () => { // 테스트 수트
    it('responds isFriend is undefined', done => { // 테스트 단위 : 채널 추가가 안되어있을 떄
        const userRequest = { // 기본 사용자 정보 시나리오
            user: {
                "properties": {
                    "isFriend": undefined // 채널 추가 상태
                }
            }
        };
        request(functions.config().test_url.app) // 테스트 하려는 기본 주소
            .post('/school-wifi/service') // 주소의 엔드포인트
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
        'responds isFriend is true and choose android',
        done => { // 테스트 단위 : 채널이 추가되어 서비스를 이용할 때
            const userRequest = { // 기본 사용자 정보 시나리오와 요청 발화문
                user: {
                    "properties": {
                        "isFriend": true
                    }
                },
                utterance: "안드로이드야"
            };
            request(functions.config().test_url.app) // 테스트 하려는 기본 주소
                .post('/school-wifi/service') // 주소의 엔드포인트
                .set('Accept', 'application/json')
                .type('application/json')
                .send({userRequest}) // body 데이터 전송
                .expect(201) // 응답 상태코드
                .then(res => {
                    const element = res
                        .body
                        .template
                        .outputs[0]
                        .simpleImage;
                    // console.log(element);
                    expect(element)
                        .to
                        .be
                        .an('object'); // 응답 결과가 오브젝트 타입인가
                    expect(element.imageUrl)
                        .to
                        .be
                        .a('string'); // 응답 결과의 이미지 경로가 문자열 타입인가
                    expect(element.altText)
                        .to
                        .be
                        .a('string'); // 응답 결과의 이미지 설명문이 문자열 타입인가
                    expect(element.altText)
                        .to
                        .equal('안드로이드일 때 연결 가이드'); // 응답 결과의 이미지 설명문이 작성한 텍스트 내용과 완전일치 하는가

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
        'responds isFriend is true and choose IOS',
        done => { // 테스트 단위 : 채널이 추가되어 서비스를 이용할 때
            const userRequest = { // 기본 사용자 정보 시나리오와 요청 발화문
                user: {
                    "properties": {
                        "isFriend": true
                    }
                },
                utterance: "IOS야"
            };
            request(functions.config().test_url.app) // 테스트 하려는 기본 주소
                .post('/school-wifi/service') // 주소의 엔드포인트
                .set('Accept', 'application/json')
                .type('application/json')
                .send({userRequest}) // body 데이터 전송
                .expect(201) // 응답 상태코드
                .then(res => {
                    const element = res
                        .body
                        .template
                        .outputs[0]
                        .simpleImage;
                    // console.log(element);
                    expect(element)
                        .to
                        .be
                        .an('object'); // 응답 결과가 오브젝트 타입인가
                    expect(element.imageUrl)
                        .to
                        .be
                        .a('string'); // 응답 결과의 이미지 경로가 문자열 타입인가
                    expect(element.altText)
                        .to
                        .be
                        .a('string'); // 응답 결과의 이미지 설명문이 문자열 타입인가
                    expect(element.altText)
                        .to
                        .equal('IOS일 때 연결 가이드'); // 응답 결과의 이미지 설명문이 작성한 텍스트 내용과 완전일치 하는가

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
        'responds isFriend is true and choose window',
        done => { // 테스트 단위 : 채널이 추가되어 서비스를 이용할 때
            const userRequest = { // 기본 사용자 정보 시나리오와 요청 발화문
                user: {
                    "properties": {
                        "isFriend": true
                    }
                },
                utterance: "윈도우야"
            };
            request(functions.config().test_url.app) // 테스트 하려는 기본 주소
                .post('/school-wifi/service') // 주소의 엔드포인트
                .set('Accept', 'application/json')
                .type('application/json')
                .send({userRequest}) // body 데이터 전송
                .expect(201) // 응답 상태코드
                .then(res => {
                    const element = res
                        .body
                        .template
                        .outputs[0]
                        .simpleImage;
                    // console.log(element);
                    expect(element)
                        .to
                        .be
                        .an('object'); // 응답 결과가 오브젝트 타입인가
                    expect(element.imageUrl)
                        .to
                        .be
                        .a('string'); // 응답 결과의 이미지 경로가 문자열 타입인가
                    expect(element.altText)
                        .to
                        .be
                        .a('string'); // 응답 결과의 이미지 설명문이 문자열 타입인가
                    expect(element.altText)
                        .to
                        .equal('윈도우일 때 연결 가이드'); // 응답 결과의 이미지 설명문이 작성한 텍스트 내용과 완전일치 하는가

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