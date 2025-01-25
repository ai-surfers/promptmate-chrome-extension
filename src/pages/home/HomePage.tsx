import styled from 'styled-components';
import { FloatButton } from 'antd';
import { TabList } from '../../core/Tab';
import List from '../../components/main/List';
import { CustomerServiceOutlined } from '@ant-design/icons';
import VOCModal from '../../components/common/modal/VOCModal';
import { useState } from 'react';
import { openPocketPromptInNewTab } from '../../service/chrome/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
		<HomePageContainer>
			<Tabs value={tab}>
				<TabsList className="w-full justify-start">
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
		</HomePageContainer>
	);
}

const HomePageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    .ant-tabs-nav {
        padding: 0 40px;

        .ant-tabs-tab {
            padding: 15px 0;
        }
    }

    .ant-tabs-content-holder {
        padding: 0 40px;
    }
`;
