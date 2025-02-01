import { useDeletePrompt } from '@/hooks/mutations/prompt/useDeletePrompt';
import { GetPromptResponse } from '../../hooks/queries/prompt/useGetPrompt';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { openPocketPromptInNewTab } from '@/service/chrome/utils';
import { MenuOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { useOverlay } from '@toss/use-overlay';

import { TextButton } from '../ui/text-button';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { PROMPT_KEYS } from '@/hooks/queries/QueryKeys';
import { useNavigate } from 'react-router-dom';
import DeleteDialog from '../common/dialog/DeleteDialog';

interface MenuDrawerProps {
	info: GetPromptResponse;
}

export default function MenuDrawer({ info }: MenuDrawerProps) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const overlay = useOverlay();
	const { toast } = useToast();

	const { mutate: deletePrompt } = useDeletePrompt({
		onSuccess(res) {
			const { success, detail } = res;

			if (!success) {
				console.log(`${detail}`);
				alert(`${detail}`);
				return;
			}

			toast({
				description: '프롬프트 삭제가 완료되었습니다',
				variant: 'dark',
				duration: 1000,
			});

			queryClient.invalidateQueries({
				queryKey: PROMPT_KEYS.detail(info.id),
			});

			queryClient.invalidateQueries({
				queryKey: PROMPT_KEYS.lists(),
			});

			navigate(-1);
		},
		onError(e) {
			alert(`${e.message}`);
		},
	});

	const menus = useMemo(
		() => [
			{
				label: '프롬프트 삭제하기',
				onClick: () => {
					overlay.open(({ isOpen, close }) => (
						<DeleteDialog
							prompt={info}
							isOpen={isOpen}
							onClose={close}
							onOk={() => deletePrompt(info.id)}
						/>
					));
				},
			},
			{
				label: '프롬프트 수정하기',
				onClick: () => {
					openPocketPromptInNewTab(`prompt-edit/${info.id}`);
				},
			},
		],
		[]
	);

	return (
		<Drawer>
			<DrawerTrigger>
				<MenuOutlined />
			</DrawerTrigger>
			<DrawerContent>
				<DrawerTitle className="hidden" />
				<DrawerDescription className="hidden" />
				<div className="w-full flex flex-col gap-3 p-2 b3_14_med text-gray-600">
					{menus.map(({ label, onClick }) => (
						<DrawerClose className="w-full" key={label} asChild>
							<TextButton className="w-full" onClick={onClick} variant="normal" size={44}>
								{label}
							</TextButton>
						</DrawerClose>
					))}
				</div>
			</DrawerContent>
		</Drawer>
	);
}
