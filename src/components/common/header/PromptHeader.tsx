import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'iconsax-react';
import { Button } from '@/components/ui/button';
import StarButton from '../button/StarButton';
import { GetPromptResponse } from '@/hooks/queries/prompt/useGetPrompt';
import { copyClipboard, getPocketPromptWebUrl } from '@/utils';
import { useUser } from '@/hooks/useUser';
import MenuDrawer from '@/components/prompt/MenuDrawer';
import { useToast } from '@/hooks/use-toast';
import { truthy } from '@/lib/utils';
import React from 'react';
import { useLogger } from '@/hooks/useLogger';

type Props = {
	prompt?: GetPromptResponse;
};
const PromptHeader = ({ prompt }: Props) => {
	const navigate = useNavigate();
	const { userData } = useUser();

	const { toast } = useToast();
	const { track } = useLogger();

	const handleSend = () => {
		if (!prompt?.id) {
			alert('존재하지 않는 프롬프트입니다.');
			return;
		}

		track('click', 'click_send_button', {
			prompt_id: prompt.id,
		});

		const url = getPocketPromptWebUrl(`prompt/${prompt.id}`);
		copyClipboard(url)
			.then(() => {
				toast({
					description: '프롬프트 링크를 복사하였습니다',
					variant: 'dark',
					duration: 1000,
				});
			})
			.catch((e) => {});
	};

	const isMyPrompt = prompt?.author_nickname === userData?.user?.nickname;

	const buttons = [
		<ShareButton onClick={handleSend} />,
		...(prompt && isMyPrompt ? [<MenuDrawer info={prompt} />] : []),
		...(prompt ? [<StarButton id={prompt.id} isFavorite={prompt.is_starred_by_user} />] : []),
	].filter(truthy);

	return (
		<header className="flex justify-between items-center absolute top-0 left-0 right-0 z-10 w-full h-[60px] bg-white px-5 py-2.5">
			<div className="flex gap-4 text-gra800 b2_16_med">
				<ArrowLeft
					size={24}
					className="text-gray-600 cursor-pointer"
					onClick={() => navigate(-1)}
				/>
				<div>프롬프트 사용하기</div>
			</div>

			<div className="flex gap-2">
				{buttons.map((button, index) => (
					<React.Fragment key={index}>{button}</React.Fragment>
				))}
			</div>
		</header>
	);
};

const ShareButton = ({ onClick }: { onClick: () => void }) => {
	return (
		<Button
			variant="secondary"
			className="p-0 w-[40px] h-[40px] rounded-[8px] border-none"
			onClick={onClick}
		>
			<Send size={20} />
		</Button>
	);
};

export default PromptHeader;
