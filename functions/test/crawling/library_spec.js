const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('GET /library', () => {
    it('responds crawling result', done => {
        request(functions.config().test_url.crawling)
            .post('/library')
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
                // console.log(res.body);
                const stats = res.body;
                /* 응답 결과가 지정한 데이터 타입, 개수인지를 테스트 */
                expect(stats)
                    .to
                    .be
                    .an('array');
                expect(stats)
                    .to
                    .have
                    .lengthOf(2);
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });
});