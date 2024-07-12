// chrome/messaging.ts

export const sendRuntimeMessage = <T>(
    message: string,
    callback: (response: T) => void,
    data: object = {}
) => {
    console.log(`[iframe] sendRuntimeMessage`, message, data);
    chrome.runtime.sendMessage({ message: message, data: data }, callback);
};

export const sendWindowMessage = (message: string, data: object = {}) => {
    console.log(`[iframe] sendWindowMessage`, message, data);
    window.parent.postMessage(
        {
            message: message,
            data: data,
        },
        "*"
    );
};

export const initOnWindowEventMessage = () => {
    window.addEventListener("message", (event) => {
        const { message, data } = event.data;
        console.log(`[iframe] onWindowEventMessage `, message, data);
    });
};

export const initOnRuntimeMessage = () => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log(`[iframe] onRuntimeMessage `, sender, request);

        if (request.message === "clicked_browser_action") {
        }
    });
};
