import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import PromptHeader from '../common/header/PromptHeader';

const PromptPageError = () => {
	const navigation = useNavigate();

	return (
		<div className="w-full h-[calc(100vh-60px)] bg-white">
			<PromptHeader />

			<div className="w-full h-full flex flex-col items-center justify-center bg-white gap-8">
				<h3 className="b1_18_med text-gray-700">프롬프트를 불러올 수 없습니다</h3>

				<Button size={44} variant="normal" onClick={() => navigation(-1)}>
					홈으로 돌아가기
				</Button>
			</div>
		</div>
	);
};

export default PromptPageError;
