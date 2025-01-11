// chrome/utils.ts
// https://developer.chrome.com/docs/extensions/reference/api/identity
// https://developer.chrome.com/docs/extensions/reference/api/scripting

import { getCurrentTabUrl, openUrlInNewTab } from "@/service/chrome/tabs";
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
                console.log("Send button not found");
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
            editableDiv.innerHTML = value.replace(/\n/g, "<br>");

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
            editableDiv.innerHTML = value.replace(/\n/g, "<br>");

            setTimeout(() => {
                triggerSendButton();
            }, 100);

            return;
        }
    };

    // Gemini
    const insertValueToGemini = (value: string) => {
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

        // Gemini - <div contenteditable>
        const contentEditableDivs = document.querySelectorAll(
            'div[contenteditable="true"]'
        );
        if (contentEditableDivs.length > 0) {
            const editableDiv = contentEditableDivs[0] as HTMLElement;
            editableDiv.innerHTML = value.replace(/\n/g, " <br>");

            triggerEnterKey(editableDiv);
        }
    };

    // Claude
    const insertValueToClaude = (value: string) => {
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

        // Claude - <div contenteditable>
        const contentEditableDivs = document.querySelectorAll(
            'div[contenteditable="true"]'
        );
        if (contentEditableDivs.length > 0) {
            const editableDiv = contentEditableDivs[0] as HTMLElement;
            editableDiv.innerHTML = value.replace(/\n/g, "<p></p>");

            setTimeout(() => {
                triggerEnterKey(editableDiv);
            }, 100);
        }
    };

    getCurrentTabUrl((url) => {
        let func: null | ((value: string) => void) = null;

        const ai_platform = getAIPlatformType(url);
        if (ai_platform === AIPlatformType.CHATGPT) {
            func = insertValueToChatGPT;
        } else if (ai_platform === AIPlatformType.CLAUDE) {
            func = insertValueToClaude;
        } else if (ai_platform === AIPlatformType.GEMINI) {
            func = insertValueToGemini;
        } else {
            console.log("* 지원하지 않는 플랫폼입니다.");
            return;
        }

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!func) {
                console.log("* 함수를 지원하지 않는 플랫폼입니다.");
                return;
            }

            if (!tabs[0].id) {
                console.log("* 처리할 탭이 없습니다. ");
                return;
            }

            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: func,
                args: [text],
            });
        });
    });
};

/**
 * 포켓 프롬프트 웹버전 열기
 * @param path
 */
export const openPocketPromptInNewTab = (path: string) => {
    getFromStorage(ACCESS_TOKEN, (value) => {
        const baseUrl = import.meta.env.VITE_WEB_URL;
        const url = `${baseUrl}/${path}?token=${value}`;
        openUrlInNewTab(url);
    });
};
