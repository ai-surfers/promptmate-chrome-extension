import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { openUrlInNewTab } from '@/service/chrome/tabs';

export interface NotSupportedModalProps {
	isOpen: boolean;
	prompt: string;
	closeModal: () => void;
}

export default function NotSupportedModal({ isOpen, closeModal }: NotSupportedModalProps) {
	function handleGoToPlatform(url: string) {
		openUrlInNewTab(url);
		closeModal();
	}

	function handleOnOpenChange(isOpen: boolean) {
		if (!isOpen) {
			closeModal();
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
			<DialogContent showCloseButton={false}>
				<DialogTitle>
					원클릭 프롬프트 실행을 위해
					<br /> ChatGPT로 이동합니다
				</DialogTitle>
				<DialogDescription className="text-center">
					chatGPT, Claude, Gemini에서 <br /> 프롬프트를 사용해 보세요!
				</DialogDescription>

				<Button onClick={closeModal} size={44} className="mt-4">
					확인
				</Button>
			</DialogContent>
		</Dialog>
	);
}
