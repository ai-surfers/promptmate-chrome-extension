# promptmate-frontend

React + typescript

<br/>

### 실행 가이드

**0. 프론트 소스 클론하기 (최신화)**

-   소스 클론 후 `git clone https://github.com/ai-surfers/promptmate-chrome-extension.git`
-   최상위 경로에 `.env` 파일 만들어 환경변수 준비

**1. 파일 빌드하기**

```bash
yarn build
```

**2. 크롬 익스텐션 [chrome://extensions/](chrome://extensions/) > 개발자 모드 ON**
<img src="https://github.com/ai-surfers/promptmate-chrome-extension/assets/87323603/e4218d13-d070-430c-946d-73911fe9acc5" width="80%"/>

**3. [압축 해제된 확장 프로그램을 로드합니다.] 클릭 후, `build/` 폴더 로드**
<img src="https://github.com/ai-surfers/promptmate-chrome-extension/assets/87323603/a3cfc0ec-94b4-4de6-95d6-7624064a6637" width="60%"/>

**4. Google Oauth Client ID 생성**

-   [구글 콘솔](https://console.cloud.google.com/apis/credentials?project=prompt-mate-5c35f)에서 OAuth 2.0 클라이언트 ID 추가
  
| 1. [사용자 인증 정보 만들기] > [OAuth 클라이언트 ID] | 2. 어플리케이션 유형 `Chrome Extension` 선택 |
| - | - |
|<img  alt="OAuth1" src="https://github.com/ai-surfers/promptmate-chrome-extension/assets/87323603/2d739ad1-bc2f-4134-8052-9881b8b4cd96"> |<img  alt="OAuth2" src="https://github.com/ai-surfers/promptmate-chrome-extension/assets/87323603/3c2d8453-7579-4072-9b44-8dfc5dd0c537">|



**5. `.env`에 해당 Client ID 넣어 다시 빌드**

-   .env의 `REACT_APP_OAUTH_CLIENT_ID`에 해당 Client ID 넣어서,
-   다시 파일 빌드 후 확인 `yarn build` 
