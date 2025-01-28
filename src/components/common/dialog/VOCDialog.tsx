import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from '@/components/ui/dialog';
import { TextButton } from '@/components/ui/text-button';
import { Textarea } from '@/components/ui/textarea';
import { usePostFeedback } from '@/hooks/mutations/feedback/usePostFeedback';
import { useToast } from '@/hooks/use-toast';
import { captureMessage } from '@sentry/react';
import { MessageText1 } from 'iconsax-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const VOCDialog = () => {
	const [open, setOpen] = useState(false);

	const form = useForm();
	const { register, reset } = form;

	const { toast } = useToast();

	const { mutate } = usePostFeedback({
		onSuccess: (res) => {
			const { success, detail } = res;

			if (!success) {
				captureMessage(`[VOCDialog] 피드백 전송 실패 - ${detail}`);
				return;
			}

			toast({
				description:
					'소중한 의견 주셔서 진심으로 감사드립니다 \n앞으로도 더 나은 서비스를 위해 최선을 다하겠습니다 :)',
				variant: 'dark',
				duration: 1000,
			});

			handleClose();
		},
		onError: (error) => {
			captureMessage(`[VOCDialog] 피드백 전송 실패 - ${error.message}`);
		},
	});

	function handleOnSubmit() {
		form.handleSubmit(
			async (values) => {
				mutate({ content: values.content });
			},
			(error) => {
				console.log(error);
			}
		)();
	}

	function handleClose() {
		reset();
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<button
				className="bg-gray-100 px-2.5 py-1 flex gap-2 rounded-[8px] c2_11_med text-gray-500 hover:bg-gray-200"
				onClick={() => setOpen(true)}
			>
				<MessageText1 size={16} />
				피드백하기
			</button>
			<DialogContent showCloseButton={false} className="gap-3 p-5">
				<DialogTitle>
					포켓 프롬프트에 대한 <br />
					피드백을 남겨주세요!
				</DialogTitle>
				<DialogDescription className="c1_12_reg text-gray-500 text-center pb-8">
					추가되었으면 하는 기능이나
					<br /> 불편한 점이 있다면 자유롭게 말씀해주세요! <br /> 여러분들의 소중한 의견을 듣고 적극
					반영하겠습니다 {':)'}
				</DialogDescription>

				<form>
					<div className="pb-4">
						<Textarea
							placeholder="여기에 의견을 작성해주세요"
							className="resize-y max-h-[300px]"
							count={300}
							{...register('content', {
								required: '내용을 입력해 주세요',
							})}
						/>
					</div>
				</form>

				<DialogFooter className="flex flex-row w-full gap-3">
					<TextButton variant="normal" className="flex-1" onClick={handleClose}>
						닫기
					</TextButton>
					<Button className="flex-1" onClick={handleOnSubmit}>
						제출하기
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default VOCDialog;
