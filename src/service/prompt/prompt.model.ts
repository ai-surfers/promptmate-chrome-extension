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

export interface AdType {
    ad_id: string;
    ad_product_name: string;
    ad_description: string;
    ad_landing_page_url: string;
    ad_picture_url: string;
}

/**
 * ExecutePromptResponse
 */
export interface ExecutePromptResponse {
    full_prompt: string;
    ad: AdType | null;
}
