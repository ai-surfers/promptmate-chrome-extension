import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, FloatButton, Tabs } from "antd";
import { TabList } from "../../core/Tab";
import List from "../../components/main/List";
import { CustomerServiceOutlined } from "@ant-design/icons";
import VOCModal from "../../components/common/modal/VOCModal";
import { useState } from "react";

export default function HomePage() {
    const navigate = useNavigate();
    const [showVOC, setShowVOC] = useState(false);

    const [tab, setTab] = useState("0");

    const handleOnChangeTab = (tab: string) => setTab(tab);

    const components = [
        <List type="starred" onChangeTab={handleOnChangeTab} />,
        <List type="open" onChangeTab={handleOnChangeTab} />,
        <List type="my" onChangeTab={handleOnChangeTab} />,
    ];

    const operation = (
        <Button type="primary" onClick={() => navigate("/new-prompt")}>
            +
        </Button>
    );

    return (
        <HomePageContainer>
            <Tabs
                tabBarExtraContent={operation}
                items={Object.entries(TabList).map(([key, value], idx) => {
                    return {
                        label: `${value}`,
                        key: `${idx}`,
                        children: components[idx],
                    };
                })}
                tabIndex={Number(tab)}
                onChange={(key) => {
                    setTab(key);
                }}
            />

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
