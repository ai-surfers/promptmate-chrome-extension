import { useQueryClient } from '@tanstack/react-query';
import { usePostStar } from '../../../hooks/mutations/star/usePostStar';
import { useDeleteStar } from '../../../hooks/mutations/star/useDeleteStar';
import { PROMPT_KEYS } from '../../../hooks/queries/QueryKeys';
import BookMark from '@/assets/BookMark';
import { Button } from '@/components/ui/button';

interface StarButtonProps {
	id: string;
	isFavorite: boolean;
	type?: 'normal' | 'list';
}

export default function StarButton({ id, isFavorite, type = 'normal' }: StarButtonProps) {
	const queryClient = useQueryClient();

	function handleOnFavoriteClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		e.stopPropagation();
		if (!id) {
			console.log('No id');
			return;
		}

		if (isFavorite) deleteStar(id);
		else postStar(id);
	}

	const { mutate: postStar } = usePostStar({
		onSuccess: (res) => {
			const { success, detail } = res;

			if (!success) {
				console.log(`${detail}`);
				alert(`${detail}`);
				return;
			}

			queryClient.invalidateQueries({ queryKey: PROMPT_KEYS.detail(id) });
			queryClient.invalidateQueries({ queryKey: PROMPT_KEYS.lists() });
		},
		onError: (error) => {
			console.log(error.message);
		},
	});

	const { mutate: deleteStar } = useDeleteStar({
		onSuccess: (res) => {
			const { success, detail } = res;

			if (!success) {
				console.log(`${detail}`);
				alert(`${detail}`);
				return;
			}

			queryClient.invalidateQueries({ queryKey: PROMPT_KEYS.detail(id) });
			queryClient.invalidateQueries({ queryKey: PROMPT_KEYS.lists() });
		},
		onError: (error) => {
			console.log(error.message);
		},
	});

	if (type === 'list') {
		return (
			<button
				className="bg-gray-100 w-[44px] h-[44px] flex items-center justify-center absolute top-0 right-0 rounded-tr-[12px] rounded-bl-[12px] hover:bg-gray-200"
				onClick={handleOnFavoriteClick}
			>
				{isFavorite ? <BookMark stroke="#7580EA" fill="#7580EA" /> : <BookMark />}
			</button>
		);
	}

	return (
		<Button
			variant={isFavorite ? 'primary' : 'normal'}
			size={44}
			className="p-0 w-[40px] h-[40px] rounded-[8px]"
			onClick={handleOnFavoriteClick}
		>
			<BookMark stroke={isFavorite ? '#fff' : '#7580EA'} height={20} />
		</Button>
	);
}
