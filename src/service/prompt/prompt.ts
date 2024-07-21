import { POST } from "../client";
import {
    CreatePromptRequest,
    CreatePromptResponse,
    ExecutePromptRequest,
    ExecutePromptResponse,
} from "./prompt.model";

/**
 *  프롬프트 등록하기
 */
export async function createPrompt(prompt: CreatePromptRequest) {
    return await POST<CreatePromptResponse>(`/prompts`, prompt);
}

/**
 *  프롬프트 사용하기
 */
export async function executePrompt(
    prompt_id: string,
    request: ExecutePromptRequest
) {
    return await POST<ExecutePromptResponse>(
        `/prompts/${prompt_id}/execute`,
        request
    );
}
