import { GET, POST } from "../client";
import {
    CreatePromptRequest,
    CreatePromptResponse,
    GetPromptResponse,
} from "./prompt.model";

/**
 *  프롬프트 등록하기
 */
export async function createPrompt(prompt: CreatePromptRequest) {
    return await POST<CreatePromptResponse>(`/prompts`, prompt);
}

/**
 *  프롬프트 조회하기
 */
export async function getPrompt(prompt_id: string) {
    return await GET<GetPromptResponse>(`/prompts/${prompt_id}`);
}
