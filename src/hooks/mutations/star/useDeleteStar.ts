import { useMutation } from '@tanstack/react-query';
import { BaseResponse, DELETE } from '../../../service/client';

interface RemoveStarResponse {
	unstar_count: number;
}

/**
 *  즐겨찾기 삭제하기
 */
export const removeStar = async (prompt_id: string) => {
	const { data } = await DELETE<RemoveStarResponse>(`/prompts/${prompt_id}/star`);
	return data;
};

interface DeleteStarMutationProps {
	onSuccess: (res: BaseResponse<RemoveStarResponse>) => void;
	onError: (e: Error) => void;
}

export const useDeleteStar = ({ onSuccess, onError }: DeleteStarMutationProps) => {
	return useMutation({
		mutationFn: (prompt_id: string) => removeStar(prompt_id),
		onSuccess: onSuccess,
		onError: onError,
	});
};
