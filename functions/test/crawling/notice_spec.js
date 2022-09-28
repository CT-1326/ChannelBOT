const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('GET /notice', () => {
    it('responds crawling result', done => {
        request(functions.config().test_url.crawling)
            .post('/bus')
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
                const keyLength = Object
                    .keys(res.body)
                    .length;
                /* 응답 결과의 개수가 지정한 값 만큼인지를 테스트 */
                expect(keyLength)
                    .to
                    .equal(9);

                for (let index = 0; index < keyLength; index++) {
                    // console.log(res.body[index]);
                    const title = res
                        .body[index]
                        .title;
                    const date = res
                        .body[index]
                        .date;
                    const url = res
                        .body[index]
                        .url;
                    // console.log(title, date, url);

                    /* 응답 결과의 구조가 지정한 데이터 타입인지를 테스트 */
                    expect(title)
                        .to
                        .be
                        .an('array');
                    expect(date)
                        .to
                        .be
                        .an('array');
                    expect(url)
                        .to
                        .be
                        .an('array');
                }
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });
});