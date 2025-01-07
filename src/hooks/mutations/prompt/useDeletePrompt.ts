import { BaseResponse, DELETE } from "@/service/client";
import { useMutation } from "@tanstack/react-query";
import { TypeOfInputType } from "../../../core/Prompt";

/**
 * DeletePromptResponse
 */
export interface DeletePromptResponse {
    prompt_id: string;
}

/**
 *  프롬프트 삭제하기
 */
export const deletePrompt = async (promptId: string) => {
    const { data } = await DELETE<DeletePromptResponse>(`/prompts/${promptId}`);
    return data;
};

interface DeletePromptMutationProps {
    onSuccess: (res: BaseResponse<DeletePromptResponse>) => void;
    onError: (e: Error) => void;
}

export const useDeletePrompt = ({
    onSuccess,
    onError,
}: DeletePromptMutationProps) => {
    return useMutation({
        mutationFn: (promptId: string) => deletePrompt(promptId),
        onSuccess: onSuccess,
        onError: onError,
    });
};
