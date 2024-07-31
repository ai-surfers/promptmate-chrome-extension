import { Outlet } from "react-router-dom";
import styled from "styled-components";
import CustomHeader from "../components/common/header/AHeader";

export default function HeaderLayout() {
    return (
        <Container>
            <CustomHeader title="Pocket Prompt" />
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
    overflow: scroll;

    position: relative;
`;

const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    background: #fff;
`;
