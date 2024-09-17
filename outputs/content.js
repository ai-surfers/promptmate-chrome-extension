/*global chrome */

const link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = chrome.runtime.getURL("style.css");
document.head.appendChild(link);

// Floating Button 추가
const buttonContainer = document.createElement("div");
buttonContainer.id = "float-btn";

const img = document.createElement("img");
img.src = chrome.runtime.getURL("images/logo_icon.png");
buttonContainer.appendChild(img);

const span = document.createElement("span");
span.innerText = "⌘P";
buttonContainer.appendChild(span);

buttonContainer.addEventListener("click", () => {
    if (!isDragging) chrome.runtime.sendMessage({ action: "clickSidePanel" });
});

document.body.appendChild(buttonContainer);

/**
 * 버튼 드래그 로직
 */

var offsetY = 0;
var button = document.getElementById("float-btn");
var isDragging = false;
var containerHeight = window.innerHeight;
var animationFrameId = null;

function updateButtonPosition(clientY) {
    var newBottom = containerHeight - clientY - offsetY;

    // 바운더리 설정 (최소 20px, 최대 window height - button height - 20)
    var minBottom = 20;
    var maxBottom = containerHeight - button.offsetHeight - 20;
    newBottom = Math.max(minBottom, Math.min(newBottom, maxBottom));

    button.style.transform = `translateY(${-newBottom}px)`;
}

button.addEventListener(
    "mousedown",
    (e) => {
        isDragging = true;
        offsetY = button.getBoundingClientRect().bottom - e.clientY;
        buttonContainer.classList.add("dragging");
        buttonContainer.style.transition = "none";
        console.log("mousedown", offsetY);
    },
    true
);

document.addEventListener(
    "mouseup",
    () => {
        isDragging = false;
        console.log("mouseup");
        buttonContainer.classList.remove("dragging");
        buttonContainer.style.transition = "all 0.3s ease";

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    },
    true
);

document.addEventListener(
    "mousemove",
    (e) => {
        e.preventDefault();
        if (!isDragging) return;

        // 기존 애니메이션 프레임이 있으면 취소
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }

        // requestAnimationFrame으로 화면 업데이트 요청
        animationFrameId = requestAnimationFrame(() =>
            updateButtonPosition(e.clientY)
        );
    },
    true
);

/**
 * 이벤트 리스너
 */
// [메시지 수신 Listener]
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("***Message received", request, sender);
});

/**
 * 미사용 코드
 */

// // 버튼 강조, 해제 함수
// function emphasizeButton() {
//     console.log("emphasize!");
//     const button = document.getElementById("float-btn");
//     if (button) {
//         button.classList.add("emphasized");

//         // 툴팁 추가 (이미 있으면 추가하지 않음)
//         if (!button.querySelector(".tooltip")) {
//             const tooltip = document.createElement("div");
//             tooltip.className = "tooltip";
//             tooltip.textContent = "사이드 패널 열기";
//             button.insertBefore(tooltip, button.firstChild);
//         }
//     }
// }

// function deemphasizeButton() {
//     console.log("deemphasize!");
//     const button = document.getElementById("float-btn");
//     if (button) {
//         button.classList.remove("emphasized");
//         const tooltip = button.querySelector(".tooltip");
//         if (tooltip) {
//             tooltip.remove();
//         }
//     }
// }
