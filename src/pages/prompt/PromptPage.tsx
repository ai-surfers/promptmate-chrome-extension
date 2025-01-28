import { useParams } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { insertPromptToDOMInput } from '../../service/chrome/utils';
import { copyClipboard, getAIPlatformType, populateTemplate } from '../../utils';
import { useGetPrompt } from '../../hooks/queries/prompt/useGetPrompt';
import { useModal } from '../../hooks/useModal';
import AdContent, { AdFooter } from '../../components/common/modal/content/AdContent';
import {
	AdType,
	ExecutePrompt,
	usePostPromptExecute,
} from '../../hooks/mutations/prompt/usePostPromptExecute';
import { useQueryClient } from '@tanstack/react-query';
import { PROMPT_KEYS } from '../../hooks/queries/QueryKeys';
import NotSupportedModal from '../../components/common/modal/NotSupportedModal';
import { getCurrentTabUrl, openUrlInNewTab } from '@/service/chrome/tabs';
import PromptHeader from '@/components/common/header/PromptHeader';
import { Chip } from '@/components/ui/chip';
import { ArrowRight2, Copy, Eye, Play, Profile } from 'iconsax-react';
import BookMark from '@/assets/BookMark';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Categories } from '@/core/Prompt';
import { Controller, useForm } from 'react-hook-form';
import { useOverlay } from '@toss/use-overlay';
import { ErrorBoundary } from '@sentry/react';
import PromptPageSkeleton from '../../components/skeleton/PromptPageSkeleton';
import PromptPageError from '../../components/error/PromptPageError';
import { useToast } from '@/hooks/use-toast';
const PromptPage = () => {
	return (
		<ErrorBoundary fallback={<PromptPageError />}>
			<Suspense fallback={<PromptPageSkeleton />}>
				<PromptPageContainer />
			</Suspense>
		</ErrorBoundary>
	);
};

export const TabList = {
	use: '프롬프트 사용하기',
	templete: '프롬프트 템플릿',
};

const PromptPageContainer = () => {
	const { id = '' } = useParams();

	const [tab, setTab] = useState('use');

	const { openModal, closeModal } = useModal();
	const { toast } = useToast();
	const overlay = useOverlay();

	const queryClient = useQueryClient();
	const { data } = useGetPrompt(id);

	const form = useForm();
	const { control, formState } = form;

	const isDisabled = formState.isSubmitting || !formState.isValid;

	const { mutate } = usePostPromptExecute({
		onSuccess: (res) => {
			const { success, detail, data } = res;
			console.log(`>> `, success, detail);

			if (!success) {
				console.log('지원하지 않는 플랫폼입니다.');
				openUrlInNewTab('https://chatgpt.com/');

				overlay.open(({ isOpen, close }) => (
					<NotSupportedModal prompt={data.full_prompt} isOpen={isOpen} closeModal={close} />
				));
				return;
			}

			insertPromptToDOMInput(data.full_prompt);

			// 광고 있는 경우, 광고 팝업 노출
			if (data.ad) {
				handleAd(data.ad);
			}

			queryClient.invalidateQueries({ queryKey: PROMPT_KEYS.detail(id) });
		},
		onError: (error) => {
			console.log(error.message);
		},
	});

	function handleUsePrompt() {
		if (!id) {
			console.log('Id가 없습니다.');
			return;
		}

		form.handleSubmit(
			async (propertyValues) => {
				getCurrentTabUrl((url) => {
					const ai_platform = getAIPlatformType(url);

					const req: ExecutePrompt = {
						context: propertyValues,
						ai_platform: ai_platform,
					};

					mutate({ prompt_id: id, request: req });
				});
			},
			(error) => {
				console.log(error);
			}
		)();
	}

	function handleCopy(e: React.MouseEvent<HTMLElement>) {
		form.handleSubmit(
			async (propertyValues) => {
				const prompt = populateTemplate(data.data.prompt_template, propertyValues);

				copyClipboard(prompt)
					.then(() => {
						toast({
							description: '프롬프트 템플릿이 복사되었습니다',
							variant: 'dark',
							duration: 1000,
						});
					})
					.catch((err) => {
						console.log('클립보드 복사 실패:', err);
						alert('클립보드 복사에 실패했습니다.');
					});
			},
			(error) => {
				console.log(error);
			}
		)();
	}

	function handleAd(ad: AdType) {
		openModal({
			title: ad.ad_product_name,
			content: <AdContent ad={ad} />,
			footer: <AdFooter closeModal={closeModal} ad={ad} />,
		});
	}

	return (
		<div className="w-full h-[calc(100vh-60px)]">
			<PromptHeader prompt={data?.data} />

			<section className="w-full px-5 py-2 flex flex-col gap-4">
				<div>
					<h1 className="h1_24_semi text-gray-800">{data.data.title} </h1>
					<p className="b3_14_reg text-gray-400 mt-1">{data.data.description}</p>
				</div>

				<div className="rounded-[12px] bg-gray-50 p-3 flex flex-col justify-start">
					<div className="flex justify-between flex-wrap gap-2">
						<div className="flex gap-2 flex-wrap">
							{data.data.categories.map((category) => (
								<Chip color="gray" size={24}>
									{Categories[category].ko}
								</Chip>
							))}
						</div>

						<div className="flex gap-4">
							<div className="flex gap-1 items-center c1_12_reg text-gray-400">
								<Eye size={16} />
								<span>{data.data.views}</span>
							</div>

							<div className="flex gap-1 items-center c1_12_reg text-gray-400">
								<Play size={16} />
								<span>{data.data.usages}</span>
							</div>

							<div className="flex gap-1 items-center c1_12_reg text-gray-400">
								<BookMark width={16} height={16} />
								<span>{data.data.star}</span>
							</div>

							<div className="flex gap-1 items-center c1_12_reg text-gray-400">
								<Profile size={16} />
								<span>{data.data.author_nickname}</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Tabs value={tab} className="relative w-full bg-white min-h-[calc(100%-110px)]">
				<TabsList className="sticky top-[60px] z-10 bg-white w-full">
					{Object.entries(TabList).map(([key, value]) => (
						<TabsTrigger key={key} value={key} onClick={() => setTab(key)} className="">
							{value}
						</TabsTrigger>
					))}
				</TabsList>

				<TabsContent
					value="use"
					className="py-4 px-5 [box-shadow:inset_0px_4px_4px_0px_rgba(31,34,61,0.015)]"
				>
					<div className="b1_18_semi text-gray-800 mb-2">프롬프트 사용하기</div>

					<form>
						<div className="flex flex-col gap-6">
							{data?.data.user_input_format.map((opt) => (
								<div className="flex flex-col gap-2" key={opt.name}>
									<div className="flex gap-3 items-center">
										<div className="b2_16_semi text-gray-800">{opt.name}</div>
										<div className="c1_12_semi text-primary-100">필수</div>
									</div>
									<Controller
										name={opt.name}
										control={control}
										rules={{
											required: `${opt.name}를 입력해 주세요!`,
										}}
										render={({ field }) => (
											<Textarea
												{...field}
												placeholder={opt.placeholder || '입력 값을 입력해 주세요.'}
												className="h-[28px]"
											/>
										)}
									/>
								</div>
							))}
						</div>
					</form>
				</TabsContent>

				<TabsContent
					value="templete"
					className="py-4 px-5 [box-shadow:inset_0px_4px_4px_0px_rgba(31,34,61,0.015)]"
				>
					<div className="b1_18_semi text-gray-800 mb-2">프롬프트 템플릿</div>
					<div className="bg-white border border-primary-20 p-4 rounded-[8px] b3_14_med text-gray-700">
						{data.data.prompt_template}
					</div>
				</TabsContent>
			</Tabs>

			<div className="sticky bottom-0 right-0 left-0 px-5 pt-3 pb-9 bg-white flex gap-3">
				<Button
					size={56}
					className="w-[56px] p-0"
					disabled={isDisabled}
					variant="normal"
					onClick={handleCopy}
				>
					<Copy size={20} />
				</Button>
				<Button
					size={56}
					className="b2_16_semi flex items-center flex-1"
					variant="primary"
					disabled={isDisabled}
					onClick={handleUsePrompt}
				>
					<div className="flex-grow">프롬프트 사용하기</div>
					<ArrowRight2 />
				</Button>
			</div>
		</div>
	);
};

export default PromptPage;
