const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('GET /cafe', () => {
    it('responds crawling result', done => {
        request(functions.config().test_url.crawling)
            .get('/cafe')
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
                const title = res.body.title;
                const description = res.body.description;
                // console.log(title, description);
                /* 학식당 정보 응답 결과가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(title)
                    .to
                    .be
                    .a('string');
                expect(title)
                    .to
                    .equal('학생식당');
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

                /* 학식 메뉴 응답 결과가 지정한 개수(시작 주소에 null 값 이슈로 +1), 데이터 타입인지를 테스트 */
                const menuTitle = res.body.menuTitle;
                const menus = res.body.menus;
                // console.log(menuTitle, menus);
                expect(menuTitle)
                    .to
                    .have
                    .lengthOf(4);
                expect(menuTitle)
                    .to
                    .be
                    .an('array');
                expect(menus)
                    .to
                    .be
                    .an('array');
                const correctMenu = [null, 'Roll & Noodles', 'The bab', 'Fry & Rice'];
                /* 학식 메뉴 종류 응답 결과가 지정한 데이터 타입, 내용, 개수(마찬가지로 null 이슈로 +1) 인지를 테스트 */
                for (let index = 1; index < menuTitle.length; index++) {
                    expect(menuTitle[index])
                        .to
                        .be
                        .a('string');
                    expect(menuTitle[index])
                        .to
                        .equal(correctMenu[index]);

                    expect(menus[index])
                        .to
                        .have
                        .lengthOf(6);
                }
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });
});