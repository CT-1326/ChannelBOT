const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('GET /notice', () => { // 테스트 수트
    it('responds crawling result', done => { // 테스트 단위(확인하고자 하는 내용을 명시)
        request(functions.config().test_url.crawling) // 테스트 하려는 기본 주소
            .get('/notice') // 주소의 엔드포인트
            .expect(201) // 응답 상태코드
            .then(res => {
                // console.log(res);
                const keyLength = Object
                    .keys(res.body)
                    .length;
                expect(keyLength)
                    .to
                    .equal(9); // 응답 결과의 갯수가 지정한 값 만큼인가

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

                    expect(title)
                        .to
                        .be
                        .an('array'); // 응답 결과가 배열 타입인가
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