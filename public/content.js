/*global chrome */
const link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = chrome.runtime.getURL("style.css");
document.head.appendChild(link);

const button = document.createElement("button");
button.id = "floatingButton";
button.innerText = "+";

button.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "clickSidePanel" });
});

document.body.appendChild(button);
