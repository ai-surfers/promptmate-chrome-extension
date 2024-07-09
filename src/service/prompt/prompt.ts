import { POST } from "../client";
import { PromptRequest, PromptResponse } from "./prompt.model";

/**
 *  프롬프트 등록하기
 */
export async function createPrompt(prompt: PromptRequest) {
    return await POST<PromptResponse>(`/prompts`, prompt);
}
