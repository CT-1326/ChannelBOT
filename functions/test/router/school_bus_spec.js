const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('POST /schoolBus', () => { // 테스트 수트
    it('responds isFriend is false', done => { // 테스트 단위 : 채널 추가가 안되어있을 떄
        const userRequest = { // 기본 사용자 정보 시나리오
            user: {
                "properties": {
                    "isFriend": undefined // 채널 추가 상태
                }
            }
        };
        request(functions.config().test_url.app) // 테스트 하려는 기본 주소
            .post('/schoolBus') // 주소의 엔드포인트
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest}) // body 데이터 전송
            .expect(201) // 응답 상태코드
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .simpleText;
                // console.log(element);
                expect(element.text)
                    .to
                    .be
                    .a('string'); // 응답 결과가 문자열 타입인가
                expect(element.text)
                    .to
                    .include("채널봇 채널 추가부터"); // 응답 결과가 작성한 텍스트 내용을 포함하는가
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });

    it('responds isFriend is true', done => { // 테스트 단위 : 채널이 추가되어 서비스를 이용할 때
        const userRequest = { // 기본 사용자 정보 시나리오와 요청 발화문
            user: {
                "properties": {
                    "isFriend": true
                }
            },
            utterance: "셔틀 버스 안내"
        };
        request(functions.config().test_url.app) // 테스트 하려는 기본 주소
            .post('/schoolBus') // 주소의 엔드포인트
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest}) // body 데이터 전송
            .expect(201) // 응답 상태코드
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .carousel;
                // console.log(element);
                expect(element.type)
                    .to
                    .equal('itemCard'); // 응답 결과 블록이 아이템 카드 뷰 타입인가

                const items = element.items;
                // console.log(items.length);
                expect(items)
                    .to
                    .have
                    .lengthOf(2); // 응답 결과 블록 개수가 작성한 값 만큼인가
                for (let index = 0; index < items.length; index++) {
                    const itemTitle = items[index].title;
                    const itemHead = items[index].head;
                    const itemList = items[index].itemList;
                    // console.log(itemTitle, itemHead, itemList);
                    expect(itemTitle)
                        .to
                        .be
                        .a('string'); // 해당 배열이 문자열 타입인가
                    expect(itemTitle)
                        .to
                        .equal('해당 안내 내용은 학교 홈페이지의 내용을 기반으로 작성되었습니다.'); // 해당 배열의 값이 작성한 텍스트 내용과 완전일치 하는가
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