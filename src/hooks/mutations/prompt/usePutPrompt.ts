import { useMutation } from "@tanstack/react-query";
import { BaseResponse, PUT } from "../../../service/client";
import { CreatePromptRequest } from "./usePostPrompt";

/**
 * ModifyPromptRequest
 */
export interface ModifyPromptRequest {
    id: string;
    prompt: CreatePromptRequest;
}

/**
 * ModifyPromptResponse
 */
export interface ModifyPromptResponse {
    prompt_id: string;
}

/**
 *  프롬프트 수정하기
 */
export const modifyPrompt = async ({ id, prompt }: ModifyPromptRequest) => {
    const { data } = await PUT<ModifyPromptResponse>(`/prompts/${id}`, prompt);
    return data;
};

interface PutPromptMutationProps {
    onSuccess: (res: BaseResponse<ModifyPromptResponse>) => void;
    onError: (e: Error) => void;
}

export const usePutPrompt = ({
    onSuccess,
    onError,
}: PutPromptMutationProps) => {
    return useMutation({
        mutationFn: (req: ModifyPromptRequest) => modifyPrompt(req),
        onSuccess: onSuccess,
        onError: onError,
    });
};
