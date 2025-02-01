import { GetPromptResponse } from '@/hooks/queries/prompt/useGetPrompt';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TextButton } from '@/components/ui/text-button';

interface DeleteDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onOk: () => void;
	prompt: GetPromptResponse;
}
const DeleteDialog = ({ isOpen, onClose, onOk, prompt }: DeleteDialogProps) => {
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
						올려주신 ‘{prompt.title}’ 는 <br />
						{prompt.views}명이 조회하고 {prompt.star}명이 저장했습니다.
					</div>
					<div className="w-full b3_14_reg text-gray-600 text-center">
						삭제한 프롬프트는 다시 돌아오지 않아요.
						<br /> 그래도 삭제하시겠나요?
					</div>
				</div>

				<DialogFooter className="flex flex-row w-full gap-3">
					<TextButton className="flex-1" variant="normal" onClick={handleOnClose} size={52}>
						삭제 취소하기
					</TextButton>
					<Button className="flex-1" onClick={handleOnOk} size={52}>
						프롬프트 삭제하기
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteDialog;
