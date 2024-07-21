import { DELETE, GET, POST } from "../client";
import {
    CreatePromptRequest,
    CreatePromptResponse,
    ExecutePromptRequest,
    ExecutePromptResponse,
    GetPromptListRequest,
    GetPromptListResponse,
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

/**
 *  즐겨찾기 등록하기
 */
export async function addStar(prompt_id: string) {
    return await POST(`/prompts/${prompt_id}/star`);
}

/**
 *  즐겨찾기 삭제하기
 */
export async function removeStar(prompt_id: string) {
    return await DELETE(`/prompts/${prompt_id}/star`);
}

/**
 *  프롬프트 리스트 조회하기
 */
export async function getPromptList(request: GetPromptListRequest) {
    return await GET<GetPromptListResponse>(`/prompts-list`, {
        params: request,
    });
}
