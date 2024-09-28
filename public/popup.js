/* global chrome */

document.addEventListener("DOMContentLoaded", () => {
    const resetButton = document.getElementById("reset-button");

    // Reset FAB 상태
    resetButton.addEventListener("click", () => {
        // 특정 설정만 초기화
        chrome.storage.local.remove(
            [
                "hideButtonUntilNextVisit",
                "disabledSites",
                "hideButtonGlobally",
                "buttonPosition",
            ],
            () => {
                console.log("Specific FAB settings have been reset");

                chrome.tabs.query({}, (tabs) => {
                    tabs.forEach((tab) => {
                        chrome.tabs.sendMessage(tab.id, { action: "resetFAB" });
                    });
                });
            }
        );
    });
});
