import { Outlet } from "react-router-dom";
import Header from "../components/common/header/Header";
import styled from "styled-components";

export default function PromptLayout() {
    return (
        <Container>
            <Header title="프롬프트 추가하기" canGoBack={true} />
            <Wrapper>
                <Outlet />
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    width: 452px;
    height: 600px;
    background: #fff;

    margin: 0 auto;
    padding-top: 60px;
    overflow: scroll;

    position: relative;
`;

const Wrapper = styled.div`
    width: 100%;
    height: calc(600px - 60px);
    background: #fff;
`;
