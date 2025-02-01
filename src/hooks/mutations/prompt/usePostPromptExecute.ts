import { useMutation } from '@tanstack/react-query';
import { BaseResponse, POST } from '../../../service/client';
import { TypeOfAIPlatformType } from '../../../core/Prompt';

/**
 * ExecutePromptRequest
 */
export interface ExecutePromptRequest {
	prompt_id: string;
	request: ExecutePrompt;
}

export interface ExecutePrompt {
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

/**
 *  프롬프트 사용하기
 */

export async function executePrompt(prompt_id: string, request: ExecutePrompt) {
	const { data } = await POST<ExecutePromptResponse>(`/prompts/${prompt_id}/execute`, request);
	return data;
}

interface PostPromptExecuteMutationProps {
	onSuccess: (res: BaseResponse<ExecutePromptResponse>) => void;
	onError: (e: Error) => void;
}

export const usePostPromptExecute = ({ onSuccess, onError }: PostPromptExecuteMutationProps) => {
	return useMutation({
		mutationFn: ({ prompt_id, request }: ExecutePromptRequest) => executePrompt(prompt_id, request),
		onSuccess: onSuccess,
		onError: onError,
	});
};
