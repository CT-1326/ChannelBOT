const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('GET /number', () => {
    it('responds crawling result', done => {
        request(functions.config().test_url.crawling)
            .post('/number')
            .expect(201)
            .set('Accept', 'application/json')
            .type('application/json')
            .send({
                'admin': functions
                    .config()
                    .api_key
                    .admin
            }) // 어드민 인증 key 전송
            .then(res => {
                // console.log(res);
                const text = res.text;
                /* 응답 결과가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(text)
                    .to
                    .be
                    .a('string');
                expect(text)
                    .to
                    .include('대표번호');
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });
});