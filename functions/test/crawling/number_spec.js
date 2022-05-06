const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('GET /number', () => { // 테스트 수트
    it('responds crawling result', done => { // 테스트 단위(확인하고자 하는 내용을 명시)
        request(functions.config().test_url.crawling) // 테스트 하려는 기본 주소
            .get('/number') // 주소의 엔드포인트
            .expect(201) // 응답 상태코드
            .then(res => {
                // console.log(res);
                const text = res.text;
                expect(text)
                    .to
                    .be
                    .a('string'); // 응답 결과가 문자열 타입인가
                expect(text)
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