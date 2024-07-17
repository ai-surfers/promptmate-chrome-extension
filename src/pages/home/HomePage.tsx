import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import All from "../../components/main/All";
import My from "../../components/main/My";
import Favorite from "../../components/main/Favorite";
import { Button, Tabs } from "antd";
import { TabList } from "../../core/Tab";

export default function HomePage() {
    const navigate = useNavigate();

    const components = [<All />, <My />, <Favorite />];
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
        padding: 10px 40px 0;
    }

    .ant-tabs-content-holder {
        padding: 0 40px;
    }
`;
