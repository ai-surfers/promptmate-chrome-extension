import { TabList } from '../../core/Tab';
import List from '../../components/main/List';
import { useState } from 'react';
import { openPocketPromptInNewTab } from '../../service/chrome/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/common/header/Header';
import { Button } from '@/components/ui/button';
import { ArrowRight2 } from 'iconsax-react';

export type TabType = keyof typeof TabList;

export default function HomePage() {
	const [tab, setTab] = useState<TabType>('open');

	const handleOnChangeTab = (tab: TabType) => setTab(tab);

	return (
		<div className="h-[calc(100%-60px-100px)] pt-[60px]">
			<Header />

			<Tabs value={tab} className="h-full">
				<TabsList className="sticky top-[60px] z-10 bg-white w-full">
					{Object.entries(TabList).map(([key, value]) => (
						<TabsTrigger key={key} value={key} onClick={() => handleOnChangeTab(key as TabType)}>
							{value}
						</TabsTrigger>
					))}
				</TabsList>
				{Object.entries(TabList).map(([key, value], idx) => (
					<TabsContent value={key} className="py-4 px-5 h-full overflow-scroll">
						<List type={key} onChangeTab={handleOnChangeTab} />
					</TabsContent>
				))}
			</Tabs>

			<PromptNewButton />
		</div>
	);
}

const PromptNewButton = () => {
	const handleNewPrompt = () => {
		openPocketPromptInNewTab('prompt-new');
	};

	return (
		<div
			className="absolute bottom-0 right-0 left-0 px-5 pt-3 pb-9 bg-white"
			onClick={handleNewPrompt}
		>
			<Button className="b2_16_semi flex items-center w-full">
				<div className="flex-grow">프롬프트 등록하러 가기</div>
				<ArrowRight2 />
			</Button>
		</div>
	);
};
