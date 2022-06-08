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
                    .equal(3); // 명학역 -> 학교의 응답 결과의 갯수가 지정한 값 만큼인가
                expect(busIn.title)
                    .to
                    .be
                    .a('string'); // 응답 결과의 제목이 문자열 타입인가
                expect(busIn.title)
                    .to
                    .include('명학'); // 응답 결과의 제목이 작성한 텍스트 내용을 포함하는가
                expect(busIn.start)
                    .to
                    .be
                    .a('string'); // 응답 결과의 오전 값이 문자열 타입인가
                expect(busIn.end)
                    .to
                    .be
                    .a('string'); // 응답 결과의 저녁 값이 문자열 타입인가

                expect(Object.keys(busOut).length)
                    .to
                    .equal(3); // 학교 -> 명학역 응답 결과의 갯수가 지정한 값 만큼인가
                expect(busOut.title)
                    .to
                    .be
                    .a('string'); // 응답 결과의 제목이 문자열 타입인가
                expect(busOut.title)
                    .to
                    .include('학교'); // 응답 결과의 제목이 작성한 텍스트 내용을 포함하는가
                expect(busOut.start)
                    .to
                    .be
                    .a('string'); // 응답 결과의 오후 값이 문자열 타입인가
                expect(busOut.end)
                    .to
                    .be
                    .a('string'); // 응답 결과의 밤 값이 문자열 타입인가
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });
});