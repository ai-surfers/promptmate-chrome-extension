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
 * @param text 삽입할 텍스트
 */
export const insertPromptToDOMInput = (text: string): void => {
    const handlers: Record<
        Exclude<AIPlatformType, AIPlatformType.NONE>,
        (value: string) => void
    > = {
        [AIPlatformType.CHATGPT]: (value: string): void => {
            // [ChatGPT] enter = 줄바꿈 / 버튼 클릭 = 전송
            const triggerSendButton = (): void => {
                const sendButton = document.querySelector(
                    '[data-testid="send-button"]'
                );
                if (sendButton) {
                    (sendButton as HTMLElement).click();
                } else {
                    console.log("Send button not found");
                }
            };

            const formatText = (text: string): string => {
                return text
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .split("\n")
                    .map((line) => `<p>${line}</p>`)
                    .join("");
            };

            const promptTextarea = document.getElementById("prompt-textarea");
            if (promptTextarea) {
                const editableDiv = promptTextarea as HTMLElement;
                editableDiv.innerHTML = formatText(value);
                setTimeout(triggerSendButton, 100);
                return;
            }

            const textarea = document.querySelector(
                "textarea"
            ) as HTMLTextAreaElement | null;
            if (textarea) {
                textarea.value = value;
                setTimeout(triggerSendButton, 100);
                return;
            }

            const contentEditableDivs = document.querySelectorAll(
                'div[contenteditable="true"]'
            );
            if (contentEditableDivs.length > 0) {
                const editableDiv = contentEditableDivs[0] as HTMLElement;
                editableDiv.innerHTML = formatText(value);
                setTimeout(triggerSendButton, 100);
            }
        },
        [AIPlatformType.GEMINI]: (value: string): void => {
            // [Gemini] enter = 전송 / shift + enter = 줄바꿈
            const triggerEnterKey = (element: HTMLElement): void => {
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

            const formatText = (text: string): string => {
                return text
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .split("\n")
                    .map((line) => `<p>${line}</p>`)
                    .join("");
            };

            const contentEditableDiv = document.querySelector(
                'div[contenteditable="true"]'
            ) as HTMLElement | null;
            if (contentEditableDiv) {
                contentEditableDiv.innerHTML = formatText(value);
                triggerEnterKey(contentEditableDiv);
            }
        },
        [AIPlatformType.CLAUDE]: (value: string): void => {
            // [Claude] enter = 전송 / shift + enter = 줄바꿈
            const triggerEnterKey = (element: HTMLElement): void => {
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

            const formatText = (text: string): string => {
                return text
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .split("\n")
                    .map((line) => `<p>${line}</p>`)
                    .join("");
            };

            const contentEditableDiv = document.querySelector(
                'div[contenteditable="true"]'
            ) as HTMLElement | null;
            if (contentEditableDiv) {
                contentEditableDiv.innerHTML = formatText(value);
                setTimeout(() => triggerEnterKey(contentEditableDiv), 100);
            }
        },
    };

    getCurrentTabUrl((url: string): void => {
        const platform = getAIPlatformType(url);

        if (platform === AIPlatformType.NONE) {
            console.log("* 지원하지 않는 플랫폼입니다.");
            return;
        }

        chrome.tabs.query(
            { active: true, currentWindow: true },
            (tabs): void => {
                if (!tabs[0]?.id) {
                    console.log("* 처리할 탭이 없습니다.");
                    return;
                }

                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: handlers[platform],
                    args: [text],
                });
            }
        );
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
