const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('GET /bus', () => { // 테스트 수트
    it('responds crawling result', done => { // 테스트 단위(확인하고자 하는 내용을 명시)
        request(functions.config().test_url.crawling) // 테스트 하려는 기본 주소
            .get('/bus') // 주소의 엔드포인트
            .expect(201) // 응답 상태코드
            .then(res => {
                // console.log(res);
                const busIn = res.body. in;
                const busOut = res.body.out;
                // console.log(busIn, busOut);
                expect(Object.keys(busIn).length)
                    .to
                    .equal(3); // 응답 결과의 갯수가 지정한 값 만큼인가
                expect(busIn.title)
                    .to
                    .be
                    .a('string'); // 응답 결과가 문자열 타입인가
                expect(busIn.title)
                    .to
                    .include('명학'); // 응답 결과가 작성한 텍스트 내용을 포함하는가
                expect(busIn.start)
                    .to
                    .be
                    .a('string');
                expect(busIn.end)
                    .to
                    .be
                    .a('string');

                expect(Object.keys(busOut).length)
                    .to
                    .equal(3); // 응답 결과의 갯수가 지정한 값 만큼인가
                expect(busOut.title)
                    .to
                    .be
                    .a('string');
                expect(busOut.title)
                    .to
                    .include('학교');
                expect(busOut.start)
                    .to
                    .be
                    .a('string');
                expect(busOut.end)
                    .to
                    .be
                    .a('string');
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });
});