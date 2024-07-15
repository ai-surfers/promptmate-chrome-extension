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
img.src = chrome.runtime.getURL("images/logo.png");
buttonContainer.appendChild(img);

const span = document.createElement("span");
span.innerText = "⌘P";
buttonContainer.appendChild(span);

buttonContainer.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "clickSidePanel" });
});

document.body.appendChild(buttonContainer);
