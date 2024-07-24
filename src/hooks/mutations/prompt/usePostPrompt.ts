import { useMutation } from "@tanstack/react-query";
import { BaseResponse, POST } from "../../../service/client";
import { TypeOfInputType } from "../../../core/Prompt";

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
    type: TypeOfInputType;
    placeholder: string;
}

/**
 * CreatePromptResponse
 */
export interface CreatePromptResponse {
    prompt_id: string;
}

/**
 *  프롬프트 등록하기
 */
export const createPrompt = async (prompt: CreatePromptRequest) => {
    const { data } = await POST<CreatePromptResponse>(`/prompts`, prompt);
    return data;
};

interface PostPromptMutationProps {
    onSuccess: (res: BaseResponse<CreatePromptResponse>) => void;
    onError: (e: Error) => void;
}

export const usePostPrompt = ({
    onSuccess,
    onError,
}: PostPromptMutationProps) => {
    return useMutation({
        mutationFn: (prompt: CreatePromptRequest) => createPrompt(prompt),
        onSuccess: onSuccess,
        onError: onError,
    });
};
