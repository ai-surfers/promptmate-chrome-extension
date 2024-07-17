/*global chrome */
let panelOpen = false;

// [Extension 설치 Listener]
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed");

    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

// [메시지 수신 Listener]
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("*Message received", request, sender);

    if (request.action === "clickSidePanel") {
        const tabId = sender.tab.id;
        const windowId = sender.tab.windowId;
        if (!panelOpen) {
            openSidePanel(tabId, windowId);
        } else {
            closeSidePanel(tabId);
        }
    }
});

// [툴바 아이콘 클릭 Listener]
chrome.action.onClicked.addListener((tab) => {
    const tabId = tab.id;
    const windowId = tab.windowId;

    openSidePanel(tabId, windowId);
    // 사이드바 클릭 버튼으로 닫을 시, close 되나 이를 확인할 수 있는 이벤트 리스너 함수 제공 X
    // 따라서, 간혹 버튼을 눌렀지만 바로 열리지 않는 경우가 있을 수 있다
});

/**
 * openSidePanel - 사이드 패널을 여는 함수
 * @param {*} tabId
 * @param {*} windowId
 */
function openSidePanel(tabId, windowId) {
    chrome.sidePanel.setOptions({
        tabId,
        enabled: true,
    });
    chrome.sidePanel.open({ windowId });
    panelOpen = true;
}

/**
 * closeSidePanel - 사이드 패널을 닫는 함수
 * @param {*} tabId
 */
function closeSidePanel(tabId, windowId) {
    chrome.sidePanel.setOptions(
        {
            tabId,
            enabled: false,
        },
        () => {
            panelOpen = false;
        }
    );
}
