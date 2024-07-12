// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed");
});

chrome.action.onClicked.addListener(function (tab) {
    sendTabMessage("clicked_browser_action");
});

/**
 * 메시지 전송 (chrome)
 */
function sendRuntimeMessage(message, data = {}, callback) {
    console.log(`[background.js] sendRuntimeMessage`, message, data);
    chrome.runtime.sendMessage({ message: message, data: data }, callback);
}

function sendTabMessage(message, data = {}, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        console.log(
            `[background.js] sendTabMessage`,
            message,
            activeTab.id,
            data
        );

        chrome.tabs.sendMessage(
            activeTab.id,
            {
                message: message,
                data: data,
            },
            callback
        );
    });
}

/**
 * 메시지 수신 (chrome)
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(`[background.js] onRuntimeMessage`, request, sender);

    if (request.message === "getAuthToken") {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            if (chrome.runtime.lastError || !token) {
                sendResponse({
                    success: false,
                    message: chrome.runtime.lastError.message,
                });
            }
            sendResponse({
                success: true,
                message: "토큰 조회에 성공하였습니다. ",
                token: token,
            });
        });

        return true;
        // onMessage 의 콜백은 내부 메세징 채널을 열린 상태로 유지하면서 sendResponse가 비동기적으로 수행될 수 있도록 true 값을 반환해야 한다
        // https://developer.chrome.com/docs/extensions/reference/api/runtime#event-onMessage
    }
});
