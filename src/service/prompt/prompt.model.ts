import { TypeOfAIPlatformType } from "../../core/Prompt";

/**
 * ExecutePromptRequest
 */
export interface ExecutePromptRequest {
    context: Record<string, string>;
    ai_platform: TypeOfAIPlatformType;
}

export interface ContextFormat {
    name: string;
    content: string;
}

/**
 * ExecutePromptResponse
 */
export interface ExecutePromptResponse {
    full_prompt: string;
    ad: null | string;
}
