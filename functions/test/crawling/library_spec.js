const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('GET /library', () => { //테스트 수트
    it('responds crawling result', done => { //테스트 단위(확인하고자 하는 내용을 명시)
        request(functions.config().test_url.crawling) //테스트 하려는 기본 주소
            .get('/library') //주소의 엔드포인트
            .expect(201) //응답 상태코드
            .then(res => {
                // console.log(res.body);
                const stats = res.body;
                expect(stats)
                    .to
                    .be
                    .an('array'); //응답 결과가 배열 타입인가
                expect(stats)
                    .to
                    .have
                    .lengthOf(2); //응답 결과 개수가 작성한 값 만큼인가
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });
});