/**
 * CreatePromptRequest
 */
export interface CreatePromptRequest {
    title: string;
    description: string;
    visibility: string;
    category: string;
    prompt_template: string;
}

/**
 * CreatePromptResponse
 */
export interface CreatePromptResponse {
    prompt_id: string;
}

/**
 * GetPromptResponse
 */
export interface GetPromptResponse extends CreatePromptRequest {
    author: string;
    star: number;
    usages: number;
    created: string;
}
