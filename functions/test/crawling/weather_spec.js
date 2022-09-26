const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('GET /weather', () => {
    it('responds get weather state', done => {
        request(functions.config().test_url.crawling)
            .post('/weather')
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
                const weather = res.body.weather;
                const main = res.body.main;
                // console.log(weather, main);
                /* 날씨 상태 응답 결과가 지정한 개수, 데이터 타입인지를 테스트 */
                expect(Object.keys(weather).length)
                    .to
                    .equal(2);
                expect(weather.state)
                    .to
                    .be
                    .a('string');
                expect(weather.icon)
                    .to
                    .include('png');

                /* 온도 상태 응답 결과가 지정한 개수, 데이터 타입인지를 테스트 */
                expect(Object.keys(main).length)
                    .to
                    .equal(4);
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