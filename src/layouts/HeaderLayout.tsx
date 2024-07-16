import { Outlet } from "react-router-dom";
import Header from "../components/common/header/Header";
import styled from "styled-components";

export default function HeaderLayout() {
    return (
        <Container>
            <Header title="프롬프트 메이트" />
            <Wrapper>
                <Outlet />
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    max-width: 452px;

    width: 100vw;
    height: 100vh;

    background: #fff;

    margin: 0 auto;
    padding-top: 60px;
    overflow: scroll;

    position: relative;
`;

const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    background: #fff;
`;
