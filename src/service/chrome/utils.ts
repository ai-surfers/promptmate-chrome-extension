// chrome/utils.ts
// https://developer.chrome.com/docs/extensions/reference/api/identity
// https://developer.chrome.com/docs/extensions/reference/api/scripting

import { AIPlatformType } from "../../core/Prompt";
import { getAIPlatformType } from "../../utils";
import { getFromStorage } from "./storage";
import { ACCESS_TOKEN } from "./storage.keys";

/**
 * DOM의 첫번째 인풋에 텍스트 inject & send
 * @param text
 */
export const insertPromptToDOMInput = (text: string) => {
    // ChatGPT
    const insertValueToChatGPT = (value: string) => {
        console.log("value is", value);
        const triggerSendButton = () => {
            const sendButton = document.querySelector(
                '[data-testid="send-button"]'
            );
            if (sendButton) {
                (sendButton as HTMLElement).click();
            } else {
                console.error("Send button not found");
            }
        };

        const triggetInputEvent = (element: HTMLElement) => {
            const inputEvent = new Event("input", {
                bubbles: true,
                cancelable: true,
            });
            element.dispatchEvent(inputEvent);
        };

        // ChatGPT - <input>
        const promptTextarea = document.getElementById("prompt-textarea");
        console.log("Is promptTextarea?", promptTextarea);
        if (promptTextarea) {
            const editableDiv = promptTextarea as HTMLElement;
            editableDiv.innerText = value;

            setTimeout(() => {
                triggerSendButton();
            }, 100);
            return;
        }

        const inputFields = document.querySelectorAll("textarea");
        console.log("Is inputFields?", inputFields);
        if (inputFields.length > 0) {
            const textarea = inputFields[0] as HTMLTextAreaElement;
            textarea.value = value;

            const inputEvent = new Event("input", { bubbles: true });
            textarea.dispatchEvent(inputEvent);

            triggetInputEvent(textarea);
            triggerSendButton();
            return;
        }

        const contentEditableDivs = document.querySelectorAll(
            'div[contenteditable="true"]'
        );
        console.log("Is div[contenteditable]?", contentEditableDivs);
        if (contentEditableDivs.length > 0) {
            const editableDiv = contentEditableDivs[0] as HTMLElement;
            editableDiv.innerText = value;

            setTimeout(() => {
                triggerSendButton();
            }, 100);

            return;
        }
    };

    // Gemini, Claude
    const insertValue = (value: string) => {
        const triggerEnterKey = (element: HTMLElement) => {
            const event = new KeyboardEvent("keydown", {
                bubbles: true,
                cancelable: true,
                key: "Enter",
                code: "Enter",
                keyCode: 13,
                which: 13,
            });
            element.dispatchEvent(event);
        };

        // Gemini, Claude - <div contenteditable>
        const contentEditableDivs = document.querySelectorAll(
            'div[contenteditable="true"]'
        );
        if (contentEditableDivs.length > 0) {
            const editableDiv = contentEditableDivs[0] as HTMLElement;
            editableDiv.innerText = value;

            setTimeout(() => {
                triggerEnterKey(editableDiv);
            }, 100); // Claude
        }
    };

    getCurrentTabUrl((url) => {
        let func = insertValue;

        const ai_platform = getAIPlatformType(url);
        if (ai_platform === AIPlatformType.CHATGPT) {
            func = insertValueToChatGPT;
        } else if (
            ai_platform === AIPlatformType.CLAUDE ||
            ai_platform === AIPlatformType.GEMINI
        ) {
            func = insertValue;
        } else {
            console.error("* 지원하지 않는 플랫폼입니다.");
            return;
        }

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0].id)
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: func,
                    args: [text],
                });
            else console.error("* 처리할 탭이 없습니다. ");
        });
    });
};

export const getCurrentTabUrl = (callback: (url: string) => void) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];

        if (activeTab.url) callback(activeTab.url);
        else callback("");
    });
};

/**
 * 특정 URL을 새 탭에서 열기
 * @param url
 */
export const openUrlInNewTab = (url: string) => {
    chrome.tabs.create({ url });
};

/**
 * 포켓 프롬프트 웹버전 열기
 * @param path
 */
export const openPocketPromptInNewTab = (path: string) => {
    getFromStorage(ACCESS_TOKEN, (value) => {
        const baseUrl = import.meta.env.VITE_WEB_URL;
        const url = `${baseUrl}/${path}?token=${value}`;
        chrome.tabs.create({ url });
    });
};
