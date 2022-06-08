const request = require('supertest');
const {expect} = require('chai');
const functions = require('firebase-functions');

describe('POST /school-weather', () => { // 테스트 수트
    it('responds isFriend is false', done => { // 테스트 단위 : 채널 추가가 안되어있을 떄
        const userRequest = { // 기본 사용자 정보 시나리오
            user: {
                "properties": {
                    "isFriend": undefined // 채널 추가 상태
                }
            }
        };
        request(functions.config().test_url.app) // 테스트 하려는 기본 주소
            .post('/school-weather') // 주소의 엔드포인트
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
            utterance: "현재 학교 날씨"
        };
        request(functions.config().test_url.app) // 테스트 하려는 기본 주소
            .post('/school-weather') // 주소의 엔드포인트
            .set('Accept', 'application/json')
            .type('application/json')
            .send({userRequest}) // body 데이터 전송
            .expect(201) // 응답 상태코드
            .then(res => {
                const element = res
                    .body
                    .template
                    .outputs[0]
                    .itemCard;
                // console.log(element);
                expect(element)
                    .to
                    .be
                    .an('object'); // 응답 결과가 오브젝트 타입인가
                expect(element.title)
                    .to
                    .include('알림'); // 응답 결과의 제목이 작성한 텍스트 내용을 포함하는가
                expect(element.description)
                    .to
                    .equal('1시간 간격으로 날씨 정보를 변경하여 안내하고 있습니다.'); // 응답 결과의 설명이 작성한 텍스트 내용과 완전일치 하는가

                const elementImage = element.imageTitle;
                expect(elementImage.title)
                    .to
                    .be
                    .a('string'); // 응답 결과의 날씨 아이콘 이미지 제목이 문자열 타입인가
                expect(elementImage.title)
                    .to
                    .include('현재 성결대학교 날씨'); // 응답 결과의 날씨 아이콘 이미지 제목이 작성한 텍스트 내용을 포함하는가
                expect(elementImage.imageUrl)
                    .to
                    .be
                    .a('string'); // 응답 결과의 날씨 아이콘 이미지 경로가 문자열 타입인가
                expect(elementImage.imageUrl)
                    .to
                    .include('png'); // 응답 결과의 날씨 아이콘 이미지가 png 인가

                const elementItems = element.itemList;
                // console.log(elementItems);
                const title = ['현재 온도', '체감 온도', '최고 기온', '최저 기온'];
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
                }
                done();
            })
            .catch(err => {
                console.error("Error >>", err);
                done(err);
            });
    });
});