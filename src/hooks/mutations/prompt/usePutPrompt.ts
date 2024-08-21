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
 *  프롬프트 수정하기
 */
export const modifyPrompt = async ({ id, prompt }: ModifyPromptRequest) => {
    const { data } = await PUT<string>(`/prompts/${id}`, prompt);
    return data;
};

interface PostPromptMutationProps {
    onSuccess: (res: BaseResponse<string>) => void;
    onError: (e: Error) => void;
}

export const usePutPrompt = ({
    onSuccess,
    onError,
}: PostPromptMutationProps) => {
    return useMutation({
        mutationFn: (req: ModifyPromptRequest) => modifyPrompt(req),
        onSuccess: onSuccess,
        onError: onError,
    });
};
