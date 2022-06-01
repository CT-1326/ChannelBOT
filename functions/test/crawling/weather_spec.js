const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('GET /weather', () => { // 테스트 수트
    it('responds get weather state', done => { // 테스트 단위(확인하고자 하는 내용을 명시)
        request(functions.config().test_url.crawling) // 테스트 하려는 기본 주소
            .get('/weather') // 주소의 엔드포인트
            .expect(201) // 응답 상태코드
            .then(res => {
                // console.log(res);
                const weather = res.body.weather;
                const main = res.body.main;
                // console.log(weather, main);
                expect(Object.keys(weather).length)
                    .to
                    .equal(2); // 응답 결과의 갯수가 지정한 값 만큼인가
                expect(weather.state)
                    .to
                    .be
                    .a('string'); // 응답 결과가 문자열 타입인가
                expect(weather.icon)
                    .to
                    .include('png'); // 응답 결과가 작성한 텍스트 내용을 포함하는가

                expect(Object.keys(main).length)
                    .to
                    .equal(4); // 응답 결과의 갯수가 지정한 값 만큼인가
                expect(main.temp)
                    .to
                    .be
                    .a('string');
                expect(main.feels)
                    .to
                    .be
                    .a('string');
                expect(main.temp_min)
                    .to
                    .be
                    .a('string');
                expect(main.temp_max)
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