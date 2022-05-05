const functions = require('firebase-functions');
const axios = require('axios');

exports.notcold = functions //함수 이름
    .region('asia-northeast1')
    .pubsub
    .schedule('*/5 * * * *') //5분 단위로 실행
    .timeZone('Asia/Seoul')
    .onRun(async () => {
        const userRequest = {
            user: {
                "properties": {
                    "isFriend": false
                }
            }
        };
        const config = { //오늘의 학식 안내 서비스 조회 관련 데이터 시나리오
            method: 'post',
            url: 'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/middleWare/schoolC' +
                    'afe/schoolCafe_service',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': '__Host-GAPS=1:23ae_DitgsPMuGttitn9FgkTTIDD8Q:zy22LzBdrhMCLSeb'
            },
            data: {
                "userRequest": {
                    "utterance": "면 종류 메뉴 알려줘"
                }
            }
        };
        const config2 = { //학사 공지사항 게시판 조회 관련 데이터 시나리오
            method: 'post',
            url: 'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/middleWare/schoolN' +
                    'otice/schoolNotice_service',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': '__Host-GAPS=1:23ae_DitgsPMuGttitn9FgkTTIDD8Q:zy22LzBdrhMCLSeb'
            },
            data: {
                "userRequest": {
                    "utterance": "학사 관련해서 알려줘"
                }
            }
        };

        await axios
            .post(
                'https://asia-northeast1-channelbot-d349b.cloudfunctions.net/middleWare/schoolB' +
                        'us',
                {userRequest}
            )
            .then(result => {
                console.log(result.status); //서비스 조회 성공 시 성공 상태 코드 출력
            })
            .catch(error => {
                console.error('Error from notcold bus : ', error); //실패 시 에러문 출력
            });

        await axios(config)
            .then(result => {
                console.log(result.status);
            })
            .catch(function (error) {
                console.log('Error from notcold cafe : ', error);
            });

        await axios(config2)
            .then(result => {
                console.log(result.status);
            })
            .catch(function (error) {
                console.log('Error from notcold notice : ', error);
            });
        return null;
    });