import { InputType } from "../../core/Prompt";

/**
 * CreatePromptRequest
 */
export interface CreatePromptRequest {
    title: string;
    description: string;
    visibility: string;
    category: string;
    prompt_template: string;
    user_input_format: InputFormat[];
}

export interface InputFormat {
    name: string;
    type:
        | InputType.TEXT
        | InputType.LONGTEXT
        | InputType.NUMBER
        | InputType.DROPDOWN;
    placeholder: string;
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
    author_nickname: string;
    star: number;
    usages: number;
    created: string;
    is_starred_by_user: boolean;
    created_at: string;
}
