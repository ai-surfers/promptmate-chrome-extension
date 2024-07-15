/*global chrome */
const link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = chrome.runtime.getURL("style.css");
document.head.appendChild(link);

// div 요소 생성
const buttonContainer = document.createElement("div");
buttonContainer.id = "float-btn";

// 이미지 요소 생성
const img = document.createElement("img");
img.src = chrome.runtime.getURL("images/logo.png"); // 이미지 경로 설정

// 이미지를 div에 추가
buttonContainer.appendChild(img);

buttonContainer.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "clickSidePanel" });
});

document.body.appendChild(buttonContainer);
