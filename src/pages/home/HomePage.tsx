import { TabList } from '../../core/Tab';
import List from '../../components/main/List';
import { useState } from 'react';
import { openPocketPromptInNewTab } from '../../service/chrome/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/common/header/Header';
import { Button } from '@/components/ui/button';
import ArrowUpRight from '@/assets/ArrowUpRight';

export type TabType = keyof typeof TabList;

export default function HomePage() {
	const [tab, setTab] = useState<TabType>('open');

	const handleOnChangeTab = (tab: TabType) => setTab(tab);

	return (
		<div className="h-full pt-[60px] pb-[80px] relative">
			<Header />

			<Tabs value={tab} className="h-full">
				<TabsList className="sticky top-[60px] z-10 bg-white w-full h-[40px]">
					{Object.entries(TabList).map(([key, value]) => (
						<TabsTrigger key={key} value={key} onClick={() => handleOnChangeTab(key as TabType)}>
							{value}
						</TabsTrigger>
					))}
				</TabsList>
				{Object.entries(TabList).map(([key, value], idx) => (
					<TabsContent
						key={key}
						value={key}
						className="data-[state=inactive]:hidden h-[calc(100%-40px)] overflow-scroll"
						forceMount
					>
						<List type={key as TabType} onChangeTab={handleOnChangeTab} />
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
		<div className="absolute bottom-0 right-0 left-0 px-5 py-3 bg-white" onClick={handleNewPrompt}>
			<Button className="b2_16_semi flex items-center w-full">
				<div className="flex-1">프롬프트 등록하러 가기</div>
				<ArrowUpRight width={24} height={24} className="flex-shrink-0" />
			</Button>
		</div>
	);
};
