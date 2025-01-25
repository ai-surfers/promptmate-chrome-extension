import { FloatButton } from 'antd';
import { TabList } from '../../core/Tab';
import List from '../../components/main/List';
import { CustomerServiceOutlined } from '@ant-design/icons';
import VOCModal from '../../components/common/modal/VOCModal';
import { useState } from 'react';
import { openPocketPromptInNewTab } from '../../service/chrome/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/common/header/Header';

export default function HomePage() {
	const [showVOC, setShowVOC] = useState(false);

	const [tab, setTab] = useState(Object.keys(TabList)[0]);

	const handleOnChangeTab = (tab: string) => setTab(tab);
	const components = [
		<List type="open" />,
		<List type="starred" onChangeTab={handleOnChangeTab} />,
		<List type="my" />,
	];

	const handleNewPrompt = () => {
		openPocketPromptInNewTab('prompt-new');
	};

	return (
		<>
			<Header />

			<Tabs value={tab} className="relative">
				<TabsList className="sticky top-[60px] z-10 bg-white w-full">
					{Object.entries(TabList).map(([key, value]) => (
						<TabsTrigger key={key} value={key} onClick={() => handleOnChangeTab(key)} className="">
							{value}
						</TabsTrigger>
					))}
				</TabsList>
				{Object.entries(TabList).map(([key, value], idx) => (
					<TabsContent value={key} className="py-4 px-5">
						{components[idx]}
					</TabsContent>
				))}
			</Tabs>

			<FloatButton
				shape="circle"
				type="primary"
				style={{ right: 24 }}
				icon={<CustomerServiceOutlined />}
				onClick={() => setShowVOC(true)}
			/>

			<VOCModal isOpen={showVOC} closeModal={() => setShowVOC(false)} />
		</>
	);
}
