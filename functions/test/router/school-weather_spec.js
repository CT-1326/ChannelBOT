const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('POST /school-weather', () => {
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
            .post('/school-weather')
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
            utterance: "현재 학교 날씨"
        };
        request(functions.config().test_url.app)
            .post('/school-weather')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .itemCard;
                // console.log(element);
                /* 응답 결과 구조가 지정한 데이터 타입, 내용인지를 테스트 */
                expect(element)
                    .to
                    .be
                    .an('object');
                expect(element.title)
                    .to
                    .include('알림');
                expect(element.description)
                    .to
                    .equal('1시간 간격으로 날씨 정보를 변경하여 안내하고 있습니다.');

                /* 응답 결과의 아이콘 이미지가 지정한 데이터 타입, 내용 인지를 테스트 */
                const elementImage = element.imageTitle;
                expect(elementImage.title)
                    .to
                    .be
                    .a('string');
                expect(elementImage.title)
                    .to
                    .include('현재 성결대학교 날씨');
                expect(elementImage.imageUrl)
                    .to
                    .be
                    .a('string');
                expect(elementImage.imageUrl)
                    .to
                    .include('png');

                const elementItems = element.itemList;
                // console.log(elementItems);
                const title = ['현재 온도', '체감 온도', '최고 기온', '최저 기온'];
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
                }
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });
});