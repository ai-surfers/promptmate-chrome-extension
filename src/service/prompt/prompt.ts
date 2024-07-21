import { POST } from "../client";
import { ExecutePromptRequest, ExecutePromptResponse } from "./prompt.model";

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
