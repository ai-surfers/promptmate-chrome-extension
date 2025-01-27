import { useNavigate } from 'react-router-dom';
import {
	ArrowLeft,
	Edit2,
	LinkCircle,
	LinkSquare,
	Menu,
	More,
	More2,
	PenAdd,
	PenRemove,
	PenTool,
	PenTool2,
	Send,
} from 'iconsax-react';
import { Button } from '@/components/ui/button';
import StarButton from '../button/StarButton';
import { GetPromptResponse } from '@/hooks/queries/prompt/useGetPrompt';
import { copyClipboard, getPocketPromptWebUrl } from '@/utils';
import { useUser } from '@/hooks/useUser';
import { MenuOutlined } from '@ant-design/icons';
import MenuDrawer from '@/components/prompt/MenuDrawer';

type Props = {
	prompt?: GetPromptResponse;
};
const PromptHeader = ({ prompt }: Props) => {
	const navigate = useNavigate();
	const { userData } = useUser();

	const handleSend = () => {
		if (!prompt?.id) {
			alert('존재하지 않는 프롬프트입니다.');
			return;
		}

		const url = getPocketPromptWebUrl(`prompt/${prompt.id}`);
		copyClipboard(url)
			.then(() => {
				alert('프롬프트 링크를 복사하였습니다.');
			})
			.catch((e) => {});
	};

	const isMyPrompt = prompt?.author_nickname === userData?.user?.nickname;

	return (
		<div className="flex justify-between items-center sticky top-0 left-0 right-0 z-10 w-full h-[60px] bg-white px-5 py-2.5">
			<div className="flex gap-4 text-gra800 b2_16_med">
				<ArrowLeft
					size={24}
					className="text-gray-600 cursor-pointer"
					onClick={() => navigate(-1)}
				/>
				<div>프롬프트 사용하기</div>
			</div>

			{prompt && (
				<>
					{isMyPrompt ? (
						<MenuDrawer info={prompt} />
					) : (
						<div className="flex gap-3">
							<Button
								variant="secondary"
								className="p-0 w-[40px] h-[40px] rounded-[8px]"
								onClick={handleSend}
							>
								<Send size={20} />
							</Button>

							<StarButton id={prompt.id} isFavorite={prompt.is_starred_by_user} />
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default PromptHeader;
