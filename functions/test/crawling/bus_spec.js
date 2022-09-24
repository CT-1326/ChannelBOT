const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('GET /bus', () => {
    it('responds crawling result', done => {
        request(functions.config().test_url.crawling)
            .get('/bus')
            .expect(201)
            .then(res => {
                // console.log(res);
                const busIn = res.body. in;
                const busOut = res.body.out;
                // console.log(busIn, busOut);
                /* 명학역 -> 학교 관련 버스 시간표 응답 결과가 지정한 갯수, 데이터 타입, 내용을 포함 하는지 테스트 */
                expect(Object.keys(busIn).length)
                    .to
                    .equal(3);
                expect(busIn.title)
                    .to
                    .be
                    .a('string');
                expect(busIn.title)
                    .to
                    .include('명학');
                expect(busIn.start)
                    .to
                    .be
                    .a('string');
                expect(busIn.end)
                    .to
                    .be
                    .a('string');

                /* 학교 -> 명학역 관련 버스 시간표 응답 결과가 지정한 갯수, 데이터 타입, 내용을 포함 하는지 테스트 */
                expect(Object.keys(busOut).length)
                    .to
                    .equal(3);
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