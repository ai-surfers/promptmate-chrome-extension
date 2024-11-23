/*global chrome */
let panelOpen = false;

// [Extension 설치 Listener]
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed");

    chrome.runtime.setUninstallURL("https://tally.so/r/w2bbGe");
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
            closeSidePanel(tabId, sender.tab.url);
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

// [탭 활성화 Listener]
chrome.tabs.onActivated.addListener((activeInfo) => {
    const tabId = activeInfo.tabId;
    const windowId = activeInfo.windowId;

    chrome.tabs.get(tabId, (tab) => {
        console.log(">> tabs onActivated", tabId, tab.url, windowId);
        checkAndEmphasisButton(tabId, tab.url);
    });
});

// [탭 업데이트 Listener]
chrome.webNavigation.onCompleted.addListener((details) => {
    const tabId = details.tabId;
    const windowId = details.windowId;

    chrome.tabs.get(tabId, (tab) => {
        console.log(">> webNavigation onCompleted", tabId, tab.url, windowId);
        checkAndEmphasisButton(tabId, tab.url);
    });
});

/**
 * checkAndEmphasisButton - 플로팅 버튼을 강조하는 함수
 * @param {*} tabId
 * @param {*} url
 */
function checkAndEmphasisButton(tabId, url) {
    // const targetUrls = ["chatgpt.com", "claude.ai", "gemini.google.com"];
    if (!url) return;

    // 240815 미사용
    // if (targetUrls.some((targetUrl) => url.includes(targetUrl)) && !panelOpen) {
    //     chrome.tabs.sendMessage(tabId, { action: "emphasizeButton" });
    // } else {
    //     chrome.tabs.sendMessage(tabId, { action: "deemphasizeButton" });
    // }
}

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

    // 패널 open 시, 강조 off
    // chrome.tabs.sendMessage(tabId, { action: "deemphasizeButton" });
}

/**
 * closeSidePanel - 사이드 패널을 닫는 함수
 * @param {*} tabId
 * @param {*} url
 */
function closeSidePanel(tabId, url) {
    chrome.sidePanel.setOptions(
        {
            tabId,
            enabled: false,
        },
        () => {
            panelOpen = false;

            // 패널 close 시, 강조 on/off 체크
            checkAndEmphasisButton(tabId, url);
        }
    );
}
