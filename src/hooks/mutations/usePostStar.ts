import { useMutation } from "@tanstack/react-query";
import { BaseResponse, POST } from "../../service/client";

interface AddStarResponse {
    prompt_id: string;
}

/**
 *  즐겨찾기 등록하기
 */
export const addStar = async (prompt_id: string) => {
    const { data } = await POST<AddStarResponse>(`/prompts/${prompt_id}/star`);
    return data;
};

interface PostStarMutationProps {
    onSuccess: (res: BaseResponse<AddStarResponse>) => void;
    onError: (e: Error) => void;
}

export const usePostStar = ({ onSuccess, onError }: PostStarMutationProps) => {
    return useMutation({
        mutationFn: (prompt_id: string) => addStar(prompt_id),
        onSuccess: onSuccess,
        onError: onError,
    });
};
