const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('POST /school-library', () => { // 테스트 수트
    it('responds isFriend is false', done => { // 테스트 단위 : 채널 추가가 안되어있을 떄
        const userRequest = { // 기본 사용자 정보 시나리오
            user: {
                "properties": {
                    "isFriend": undefined // 채널 추가 상태
                }
            }
        };
        request(functions.config().test_url.app) // 테스트 하려는 기본 주소
            .post('/school-library') // 주소의 엔드포인트
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
            utterance: "학술정보관 좌석 현황"
        };
        request(functions.config().test_url.app) // 테스트 하려는 기본 주소
            .post('/school-library') // 주소의 엔드포인트
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest}) // body 데이터 전송
            .expect(201) // 응답 상태코드
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .listCard;
                expect(element)
                    .to
                    .be
                    .an('object'); // 응답 결과가 오브젝트 타입인가
                // console.log(element);
                const elementHeader = element.header;
                expect(elementHeader.title)
                    .to
                    .be
                    .a('string'); // 응답 결과의 헤더가 문자열 타입인가
                expect(elementHeader.title)
                    .to
                    .equal('학술정보관 열람실 좌석 현황'); // 응답 결과의 헤더 제목이 작성한 텍스트 내용과 완전일치 하는가
                expect(elementHeader.imageUrl)
                    .to
                    .be
                    .a('string'); // 응답 결과의 헤더 이미지가 문자열 타입인가

                const elementItems = element.items;
                // console.log(elementItems);
                const title = ['일반', '노트북'];
                for (let index = 0; index < elementItems.length; index++) {
                    const itemTitle = elementItems[index].title;
                    const itemDescription = elementItems[index].description;
                    expect(itemTitle)
                        .to
                        .be
                        .a('string'); // 응답 결과의 아이템 제목이 문자열 타입인가
                    expect(itemTitle)
                        .to
                        .include(title[index]); // 응답 결과의 아이템 제목이 지정한 배열 내용을 포함하는가
                    expect(itemDescription)
                        .to
                        .be
                        .a('string'); // 응답 결과의 아이템 본문이 문자열 타입인가
                    expect(itemDescription)
                        .to
                        .include('[남은 좌석/전체 좌석]'); // 응답 결과의 아이템 본문이 작성한 텍스트 내용을 포함하는가
                }

                const elementButtons = element.buttons[0];
                expect(elementButtons.label)
                    .to
                    .be
                    .a('string'); // 응답 결과의 버튼명이 문자열 타입인가
                expect(elementButtons.label).equal('학술정보관 사이트'); // 응답 결과의 버튼명이 작성한 텍스트 내용과 완전일치 하는가
                expect(elementButtons.action)
                    .to
                    .equal('webLink'); // 응답 결과의 버튼이 웹 링크 타입인가
                expect(elementButtons.webLinkUrl)
                    .to
                    .be
                    .a('string'); // 응답 결과의 버튼 링크가 문자열 타입인가
                expect(elementButtons.webLinkUrl)
                    .to
                    .include('library.sungkyul'); // 응답 결과의 버튼 링크가 작성한 텍스트 내용을 포함하는가
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });
});