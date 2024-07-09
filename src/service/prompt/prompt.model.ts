import { Visibility } from "../../core/Prompt";

/**
 * PromptRequest
 */
export interface PromptRequest {
    title: string;
    description: string;
    visibility: Visibility;
    category: string;
    prompt_template: string;
}

/**
 * PromptResponse
 */
export interface PromptResponse {
    id: string;
}
