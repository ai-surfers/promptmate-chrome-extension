import { useMutation } from '@tanstack/react-query';
import { BaseResponse, POST } from '../../../service/client';

export interface AddEventTagRequest {
	user_email: string;
	event_type: 'click' | 'impression' | 'pageView';
	event_label: string;
	event_params: Record<string, any>;
	page_url: string;
}

/**
 *  이벤트 남기기
 */
export const addEventTag = async (req: AddEventTagRequest) => {
	const { data } = await POST<string>(`/event-tag`, req);
	return data;
};

interface PostEventTagMutationProps {
	onSuccess: (res: BaseResponse<string>) => void;
	onError: (e: Error) => void;
}

export const usePostEventTag = ({ onSuccess, onError }: PostEventTagMutationProps) => {
	return useMutation({
		mutationFn: (req: AddEventTagRequest) => addEventTag(req),
		onSuccess: onSuccess,
		onError: onError,
	});
};
