import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from '../../hooks/useAlert';
import { Wrapper } from '../../layouts/Layout';
import PromptForm from '../../components/newPrompt/PromptForm';
import { CreatePromptRequest } from '../../hooks/mutations/prompt/usePostPrompt';
import { useQueryClient } from '@tanstack/react-query';
import { useGetPrompt } from '../../hooks/queries/prompt/useGetPrompt';
import { usePutPrompt } from '../../hooks/mutations/prompt/usePutPrompt';
import { PROMPT_KEYS } from '../../hooks/queries/QueryKeys';
import Header from '@/components/common/header/Header';

export default function ModifyPromptPage() {
	const { id = '' } = useParams();

	const navigate = useNavigate();
	const { openAlert, closeAlert } = useAlert();
	const queryClient = useQueryClient();

	const { data } = useGetPrompt(id);

	const { mutate: modify } = usePutPrompt({
		onSuccess: (res) => {
			const { data } = res;
			console.log(data);

			// 성공
			openAlert({
				content: `${data.prompt_id}가 수정되었습니다`,
				callback: () => {
					navigate(-1);
					closeAlert();
				},
			});

			queryClient.invalidateQueries({ queryKey: PROMPT_KEYS.detail(id) });
		},
		onError: (error) => {
			console.log(error);
		},
	});

	function modifyPrompt(promptData: CreatePromptRequest) {
		modify({
			id: id,
			prompt: promptData,
		});
	}

	return (
		<>
			<Header />
			<Wrapper>
				{data?.data && <PromptForm onSubmit={modifyPrompt} initialData={data.data} />}
			</Wrapper>
		</>
	);
}
