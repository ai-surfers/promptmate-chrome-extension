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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { TextButton } from '../ui/text-button';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { PROMPT_KEYS } from '@/hooks/queries/QueryKeys';
import { useNavigate } from 'react-router-dom';

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
						<DeleteDialog isOpen={isOpen} onClose={close} onOk={() => deletePrompt(info.id)} />
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

interface DeleteDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onOk: () => void;
}
const DeleteDialog = ({ isOpen, onClose, onOk }: DeleteDialogProps) => {
	const handleOpenChange = (isOpen: boolean) => {
		if (!isOpen) onClose();
	};

	const handleOnClose = () => {
		onClose();
	};

	const handleOnOk = () => {
		onOk();
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent showCloseButton={false} className="gap-8">
				<DialogTitle>정말 해당 프롬프트를 삭제하시겠어요?</DialogTitle>
				<DialogDescription className="hidden"></DialogDescription>
				<div className="flex flex-col gap-3">
					<div className="w-full bg-primary-10 rounded-[8px] px-4 py-3 b3_14_semi text-primary-100 text-center">
						올려주신 ‘파워포인트 작성 치트키’ 는 <br />
						1,254명이 조회하고 1,209명이 저장했습니다.
					</div>
					<div className="w-full b3_14_reg text-gray-600 text-center">
						삭제한 프롬프트는 다시 돌아오지 않아요.
						<br /> 그래도 삭제하시겠나요?
					</div>
				</div>

				<DialogFooter className="flex flex-row w-full gap-3">
					<TextButton className="flex-1" variant="normal" onClick={handleOnClose}>
						삭제 취소하기
					</TextButton>
					<Button className="flex-1" onClick={handleOnOk}>
						프롬프트 삭제하기
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
