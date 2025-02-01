import { GetPromptResponse } from '../../hooks/queries/prompt/useGetPrompt';

import { Eye, Play } from 'iconsax-react';
import BookMark from '@/assets/BookMark';
import StarButton from '../common/button/StarButton';

interface ListItemProps {
	prompt: GetPromptResponse;
	onClick: () => void;
}

export default function ListItem({ prompt, onClick }: ListItemProps) {
	return (
		<div
			className="bg-white rounded-[12px] border border-gray-100 p-4 flex flex-col gap-3 cursor-pointer hover:shadow-sm relative"
			onClick={onClick}
		>
			<h3 className="b1_18_semi text-gray-600 pr-[44px]">{prompt.title}</h3>
			<p className="b3_14_reg text-gray-400 line-clamp-2">{prompt.description}</p>

			<hr className="border border-gray-100" />

			<div className="w-full flex justify-end gap-5">
				<div className="flex gap-1 items-center c1_12_reg text-gray-400">
					<Eye size={16} />
					<span>{prompt.views}</span>
				</div>

				<div className="flex gap-1 items-center c1_12_reg text-gray-400">
					<Play size={16} />
					<span>{prompt.usages}</span>
				</div>

				<div className="flex gap-1 items-center c1_12_reg text-gray-400">
					<BookMark width={16} height={16} />
					<span>{prompt.star}</span>
				</div>
			</div>

			<StarButton type="list" id={prompt.id} isFavorite={prompt.is_starred_by_user} />
		</div>
	);
}
