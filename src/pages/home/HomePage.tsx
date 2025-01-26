import { TabList } from '../../core/Tab';
import List from '../../components/main/List';
import { useState } from 'react';
import { openPocketPromptInNewTab } from '../../service/chrome/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/common/header/Header';
import { Button } from '@/components/ui/button';
import { ArrowRight2 } from 'iconsax-react';

export default function HomePage() {
	const [tab, setTab] = useState(Object.keys(TabList)[0]);

	const handleOnChangeTab = (tab: string) => setTab(tab);
	const components = [
		<List type="open" />,
		<List type="starred" onChangeTab={handleOnChangeTab} />,
		<List type="my" />,
	];

	return (
		<div>
			<Header />

			<div className="relative">
				<Tabs value={tab} className="relative">
					<TabsList className="sticky top-[60px] z-10 bg-white w-full">
						{Object.entries(TabList).map(([key, value]) => (
							<TabsTrigger
								key={key}
								value={key}
								onClick={() => handleOnChangeTab(key)}
								className=""
							>
								{value}
							</TabsTrigger>
						))}
					</TabsList>
					{Object.entries(TabList).map(([key, value], idx) => (
						<TabsContent value={key} className="py-4 px-5 min-h-[100vh]">
							{components[idx]}
						</TabsContent>
					))}
				</Tabs>

				<PromptNewButton />
			</div>
		</div>
	);
}

const PromptNewButton = () => {
	const handleNewPrompt = () => {
		openPocketPromptInNewTab('prompt-new');
	};

	return (
		<div
			className="sticky bottom-0 right-0 left-0 px-5 pt-3 pb-9 bg-white"
			onClick={handleNewPrompt}
		>
			<Button className="b2_16_semi flex items-center w-full">
				<div className="flex-grow">프롬프트 등록하러 가기</div>
				<ArrowRight2 />
			</Button>
		</div>
	);
};
