const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('POST /school-bus', () => {
    /* 테스트 단위 : 채널 추가가 안되어있을 떄 */
    it('responds isFriend is undefined', done => {
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": undefined // 카카오 채널 미추가 상태
                }
            }
        };
        request(functions.config().test_url.app)
            .post('/school-bus')
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
        /* 테스트 사용자 채널 추가 상태와 요청 발화문 */
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "셔틀 버스 안내"
        };
        request(functions.config().test_url.app)
            .post('/school-bus')
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest})
            .expect(201)
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .carousel;
                // console.log(element);
                /* 응답 결과가 구조가 지정한 데이터 타입이자 개수만큼 인지를 테스트 */
                expect(element.type)
                    .to
                    .equal('itemCard');

                const items = element.items;
                // console.log(items.length);
                expect(items)
                    .to
                    .have
                    .lengthOf(2);
                /* 응답 결과 내용이 지정한 데이터 타입, 내용 인지를 테스트 */
                for (let index = 0; index < items.length; index++) {
                    const itemTitle = items[index].title;
                    const itemHead = items[index].head;
                    const itemList = items[index].itemList;
                    // console.log(itemTitle, itemHead, itemList);
                    expect(itemTitle)
                        .to
                        .be
                        .a('string');
                    expect(itemTitle)
                        .to
                        .equal('해당 안내 내용은 학교 홈페이지의 내용을 기반으로 작성되었습니다.');
                    expect(itemHead)
                        .to
                        .be
                        .an('object');
                    expect(itemHead.title)
                        .to
                        .be
                        .a('string');
                    expect(itemList)
                        .to
                        .be
                        .an('array');
                    for (let jndex = 0; jndex < itemList.length; jndex++) {
                        const title = itemList[jndex].title;
                        const description = itemList[jndex].description;
                        expect(title)
                            .to
                            .be
                            .a('string');
                        expect(description)
                            .to
                            .be
                            .a('string');
                    }
                }
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });
});