import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../hooks/useAlert';
import { Wrapper } from '../../layouts/Layout';
import PromptForm from '../../components/newPrompt/PromptForm';
import { CreatePromptRequest, usePostPrompt } from '../../hooks/mutations/prompt/usePostPrompt';
import { useQueryClient } from '@tanstack/react-query';
import Header from '@/components/common/header/Header';

export default function NewPromptPage() {
	const navigate = useNavigate();
	const { openAlert, closeAlert } = useAlert();
	const queryClient = useQueryClient();

	const { mutate } = usePostPrompt({
		onSuccess: (res) => {
			const { data } = res;
			console.log(data);

			// 성공 시, 홈화면으로 이동
			openAlert({
				content: `${data.prompt_id}가 등록되었습니다`,
				callback: () => {
					navigate('/home');
					closeAlert();
				},
			});

			queryClient.invalidateQueries();
		},
		onError: (error) => {
			console.log(error);
		},
	});

	function savePrompt(promptData: CreatePromptRequest) {
		mutate(promptData);
	}

	return (
		<>
			<Header />
			<Wrapper>
				<PromptForm onSubmit={savePrompt} />
			</Wrapper>
		</>
	);
}
