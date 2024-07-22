import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Tabs } from "antd";
import { TabList } from "../../core/Tab";
import List from "../../components/main/List";

export default function HomePage() {
    const navigate = useNavigate();

    const components = [
        <List type="open" />,
        <List type="my" />,
        <List type="starred" />,
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
                items={TabList.map((tab, idx) => {
                    return {
                        label: `${tab}`,
                        key: tab,
                        children: components[idx],
                    };
                })}
            />
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
