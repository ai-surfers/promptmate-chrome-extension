# 🌐 Pocket Prompt Extension

포켓 프롬프트의 크롬 익스텐션으로, <br/>
현재 [익스텐션 스토어](https://chromewebstore.google.com/detail/pocket-prompt/ffinlaeadcgbhecidamekinhbfkdhodd)에서 다운로드가 가능합니다

<br/>

## ⚙️ 환경 설정

### ➀ .env 서브모듈로 관리

해당 레포지토리는 [서브모듈](https://github.com/ai-surfers/promptmate-chrome-extension-envs/tree/b0499743fd5e4c93ae465db49b4d671fdbeae322)로 환경 변수를 관리하고 있습니다

> 🔥 주의
>
> 처음 서브모듈을 받을 때는 `git submodule update --init --recursive` 명령어를 수행

> ✔️ env 수정 방법 <br/>
>
> 1. 해당 레포지토리에서 파일 수정
> 2. `git submodule update --remote` 명령어로 서브모듈 최신화
> 3. 최신화 내용 커밋

### ② 파일 빌드하기

익스텐션은 빌드 후 설치하여야 테스트가 가능합니다

```bash
./build-dev.sh
./build-prod.sh
```

<br/>

## 🌳 테스트 및 배포 방법

### 테스트하기 (DEV)

1. `./build-dev.sh` 로 DEV 파일 빌드 (/outputs 폴더)
2. 크롬 익스텐션 [chrome://extensions/](chrome://extensions/) > 개발자 모드 ON
   <img src="https://github.com/ai-surfers/promptmate-chrome-extension/assets/87323603/e4218d13-d070-430c-946d-73911fe9acc5" width="80%"/>
3. [압축 해제된 확장 프로그램을 로드합니다.] 클릭 후, `outputs/` 폴더 로드
   <img src="https://github.com/ai-surfers/promptmate-chrome-extension/assets/87323603/a3cfc0ec-94b4-4de6-95d6-7624064a6637" width="80%"/>

### 개발자 대시보드에 심사 올리기

1. `./build-prod.sh` 로 PROD 파일 빌드 <br/>
   (/build 폴더 결과물이 `build-1.0.0.zip` 형식으로 저장됨)
2. 개발자 대시보드 > 패키지 > 새 패키지 업로드 후 검토 제출 (체크박스 해제)
3. 검토 완료 시, [릴리즈 노트](https://pocket-prompt.notion.site/Release-Note-fffd02185fca8083bad2ea2cbf1c3420) 업데이트

> 🚨주의 <br/>
> 검토 제출 시, **🚨심사 완료 후 즉시 게시 체크박스**를 반드시 해제해야 합니다!

<br/>

## 🗒️ 작업 방식

별도의 다른 브랜치 없이 main 브랜치 하나만 사용하고 있습니다

-   작업 시작 시, main에서 브랜치 따서 작업
-   작업 완료 후, 작업 브랜치 -> main PR (현재 커밋 이력을 깔끔하게 가져가기 위해 squash merge 사용 중)
