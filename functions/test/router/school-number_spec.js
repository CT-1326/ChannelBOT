const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('POST /school-number', () => { // 테스트 수트
    it('responds isFriend is undefined', done => { // 테스트 단위 : 채널 추가가 안되어있을 떄
        const userRequest = { // 기본 사용자 정보 시나리오
            user: {
                "properties": {
                    "isFriend": undefined // 채널 추가 상태
                }
            }
        };
        request(functions.config().test_url.app) // 테스트 하려는 기본 주소
            .post('/school-number') // 주소의 엔드포인트
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
            utterance: "학교 번호 안내"
        };
        request(functions.config().test_url.app) // 테스트 하려는 기본 주소
            .post('/school-number') // 주소의 엔드포인트
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
                    .a('string'); // 응답 결과가 문자열 타입인가
                expect(element.text)
                    .to
                    .include('대표번호'); // 응답 결과가 작성한 텍스트 내용을 포함하는가
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });
});