import { useMutation } from '@tanstack/react-query';
import { BaseResponse, POST } from '../../../service/client';

export interface AddFeedBackRequest {
	category: string;
	content: string;
	rating: number;
}
interface AddFeedBackResponse {
	feedback_id: string;
}

/**
 *  피드백 남기기
 */
export const addFeedBack = async (req: AddFeedBackRequest) => {
	const { data } = await POST<AddFeedBackResponse>(`/feedback`, req);
	return data;
};

interface PostStarMutationProps {
	onSuccess: (res: BaseResponse<AddFeedBackResponse>) => void;
	onError: (e: Error) => void;
}

export const usePostFeedback = ({ onSuccess, onError }: PostStarMutationProps) => {
	return useMutation({
		mutationFn: (req: AddFeedBackRequest) => addFeedBack(req),
		onSuccess: onSuccess,
		onError: onError,
	});
};
