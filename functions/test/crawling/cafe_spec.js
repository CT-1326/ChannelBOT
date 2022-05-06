const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('GET /cafe', () => { // 테스트 수트
    it('responds crawling result', done => { // 테스트 단위(확인하고자 하는 내용을 명시)
        request(functions.config().test_url.crawling) // 테스트 하려는 기본 주소
            .get('/cafe') // 주소의 엔드포인트
            .expect(201) // 응답 상태코드
            .then(res => {
                // console.log(res);
                const title = res.body.title;
                const description = res.body.description;
                // console.log(title, description);
                expect(title)
                    .to
                    .be
                    .a('string'); // 응답 결과가 문자열 타입인가
                expect(title)
                    .to
                    .include('식당'); // 응답 결과가 작성한 텍스트 내용을 포함하는가
                expect(description)
                    .to
                    .be
                    .a('string');
                expect(description)
                    .to
                    .include('위치');
                expect(description)
                    .to
                    .include('시간');

                const menuTitle = res.body.menuTitle;
                const menus = res.body.menus;
                // console.log(menuTitle, menus);
                expect(menuTitle)
                        .to
                        .have
                        .lengthOf(4); // 해당 배열의 사이즈가 작성한 값 만큼인가(시작 주소에 null 값이 들어가는 관계로 음식종류 + 1)
                expect(menuTitle)
                    .to
                    .be
                    .an('array'); // 응답 결과가 배열 타입인가
                expect(menus)
                    .to
                    .be
                    .an('array');
                const correctMenu = [null, 'Roll & Noodles', 'The bab', 'Fry & Rice'];
                for (let index = 1; index < menuTitle.length; index++) {
                    expect(menuTitle[index])
                        .to
                        .be
                        .a('string');
                    expect(menuTitle[index])
                        .to
                        .equal(correctMenu[index]); // 해당 배열의 값이 의도한 내용의 배열 값과 완전일치 하는가

                    expect(menus[index])
                        .to
                        .have
                        .lengthOf(6); // 해당 배열의 사이즈가 작성한 값 만큼인가(시작 주소에 null 값이 들어가는 관계로 주5일 + 1)
                }
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });
});