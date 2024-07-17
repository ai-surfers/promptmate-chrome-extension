// chrome/utils.ts
// https://developer.chrome.com/docs/extensions/reference/api/identity
// https://developer.chrome.com/docs/extensions/reference/api/scripting

/**
 * Chrome identity API 이용하여 토큰 조회
 * @param callback
 */
export const getAuthToken = (callback: (token: string) => void) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (chrome.runtime.lastError || !token) {
            chrome.tabs.create({
                url: "https://accounts.google.com/signin",
            });

            callback("");
            return;
        }
        console.log("signed in!", token);

        console.log(`🟠 [Chrome Identity] getAuthToken - ${token}`);
        callback(token);
    });
};

/**
 * DOM의 첫번째 인풋에 텍스트 inject
 * @param text
 */
export const insertPromptToDOMInput = (text: string) => {
    const insertValue = (value: string) => {
        // Gemini만 정상 동작, 1차 MVP에서는 제외
        // const triggerEnterKey = (element: HTMLElement) => {
        //     console.log(">> triggered");
        //     const event = new KeyboardEvent("keydown", {
        //         bubbles: true,
        //         cancelable: true,
        //         key: "Enter",
        //         code: "Enter",
        //         keyCode: 13,
        //         which: 13,
        //     });
        //     element.dispatchEvent(event);
        // };

        const triggetInputEvent = (element: HTMLElement) => {
            const inputEvent = new Event("input", {
                bubbles: true,
                cancelable: true,
            });
            element.dispatchEvent(inputEvent);
        };

        // ChatGPT - <input>
        const inputFields = document.querySelectorAll("textarea");
        if (inputFields.length > 0) {
            const textarea = inputFields[0] as HTMLTextAreaElement;
            textarea.value = value;
            triggetInputEvent(textarea);
        }

        // Gemini, Claude - <div contenteditable>
        const contentEditableDivs = document.querySelectorAll(
            'div[contenteditable="true"]'
        );
        if (contentEditableDivs.length > 0) {
            const editableDiv = contentEditableDivs[0] as HTMLElement;
            editableDiv.innerText = value;
        }
    };

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].id)
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: insertValue,
                args: [text],
            });
        else console.error("* 처리할 탭이 없습니다. ");
    });
};
