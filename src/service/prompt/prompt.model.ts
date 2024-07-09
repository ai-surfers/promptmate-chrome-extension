/**
 * PromptRequest
 */
export interface PromptRequest {
    title: string;
    description: string;
    visibility: string;
    category: string;
    prompt_template: string;
}

/**
 * PromptResponse
 */
export interface PromptResponse {
    id: string;
}
