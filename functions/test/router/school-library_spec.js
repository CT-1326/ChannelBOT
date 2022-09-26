const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('POST /school-library', () => {
    /* 테스트 단위 : 채널 추가가 안되어있을 떄 */
    it('responds isFriend is undefined', done => {
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": undefined
                }
            }
        };
        request(functions.config().test_url.app)
            .post('/school-library')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .simpleText;
                // console.log(element);
                /* 응답 결과가 지정한 데이터 타입이자 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');
                expect(element.text)
                    .to
                    .be
                    .a('string');
                expect(element.text)
                    .to
                    .include("채널봇 채널 추가부터");
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });

    /* 테스트 단위 : 채널이 추가되어 서비스를 이용할 때 */
    it('responds isFriend is true', done => {
        /* 테스트 사용자 요청 발화문 추가 */
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "학술정보관 좌석 현황"
        };
        request(functions.config().test_url.app)
            .post('/school-library')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .listCard;
                /* 응답 결과 구조가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');
                // console.log(element);
                const elementHeader = element.header;
                expect(elementHeader.title)
                    .to
                    .be
                    .a('string');
                expect(elementHeader.title)
                    .to
                    .equal('학술정보관 열람실 좌석 현황');
                expect(elementHeader.imageUrl)
                    .to
                    .be
                    .a('string');

                const elementItems = element.items;
                // console.log(elementItems);
                const title = ['일반', '노트북'];
                /* 응답 결과 내용이 지정한 데이터 타입, 내용인지를 테스트 */
                for (let index = 0; index < elementItems.length; index++) {
                    const itemTitle = elementItems[index].title;
                    const itemDescription = elementItems[index].description;
                    expect(itemTitle)
                        .to
                        .be
                        .a('string');
                    expect(itemTitle)
                        .to
                        .include(title[index]);
                    expect(itemDescription)
                        .to
                        .be
                        .a('string');
                    expect(itemDescription)
                        .to
                        .include('[남은 좌석/전체 좌석]');
                }

                /* 응답 결과 버튼이 지정한 데이터 타입, 내용인지를 테스트 */
                const elementButtons = element.buttons[0];
                expect(elementButtons.label)
                    .to
                    .be
                    .a('string');
                expect(elementButtons.label).equal('학술정보관 사이트');
                expect(elementButtons.action)
                    .to
                    .equal('webLink');
                expect(elementButtons.webLinkUrl)
                    .to
                    .be
                    .a('string');
                expect(elementButtons.webLinkUrl)
                    .to
                    .include('library.sungkyul');
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });
});