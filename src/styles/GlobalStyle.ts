import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`

${reset}

 a{
  text-decoration: none;
 }

 * {
  box-sizing: border-box;
 }

 button {
  cursor: pointer;
 }

 :root {
  --vh: 100%;
 }

 html, body{
  overflow-x :  hidden;
 }

 /* .react-loading-skeleton {
    line-height: unset !important;
} */
 
#root, body, html {
    scrollbar-width: none; /* 파이어폭스 스크롤바 숨김 */
    margin: 0 auto;
    padding: 0;
    /* font-size: 62.5%; */
    -ms-overflow-style: none; /* 인터넷 익스플로러  스크롤바 숨김 */
    scrollbar-width: none; /* 파이어폭스 스크롤바 숨김 */

    /* 버튼 클릭 시 색 제거 */
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
#root::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 스크롤바 숨김 */
}

.custom-toast-margin{
    margin-bottom: 6.4rem;
}

button,
input,
textarea {
    -webkit-appearance: button; 
    cursor: pointer; 
    border: none;
    line-height: normal;
}

input, textarea, select {
  outline: none;
}

body {
    width: 100%;
    height: 100%;
    background: #efefef;
}


// Ant Design Tour 
.ant-tour {
    max-width: fit-content;
    max-height: fit-content;

    padding: 20px;
p}

.ant-tour-content {
    max-width: fit-content;
    max-height: fit-content;

    margin: auto;
}
`;

export default GlobalStyle;
