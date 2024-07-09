import { useNavigate } from "react-router-dom";
import Tab from "../../components/main/Tab";
import styled from "styled-components";
import All from "../../components/main/All";
import My from "../../components/main/My";
import Favorite from "../../components/main/Favorite";
import { useState } from "react";

export default function HomePage() {
    const navigate = useNavigate();

    const components = [<All />, <My />, <Favorite />];
    const [tabIdx, setTabIdx] = useState(0);

    return (
        <HomePageContainer>
            <Tab
                current={tabIdx}
                onChange={(idx) => setTabIdx(idx)}
                onAdd={() => navigate("/prompt")}
            />

            <ComponentContainer>{components[tabIdx]}</ComponentContainer>
        </HomePageContainer>
    );
}

const HomePageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    padding-top: 50px;
`;

const ComponentContainer = styled.div`
    width: 100%;
    height: calc(600px - (60px + 50px));
    padding: 40px;
`;
