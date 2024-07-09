import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import styled from "styled-components";

export default function Layout() {
    return (
        <Container>
            <Header />
            <Wrapper>
                <Outlet />
            </Wrapper>
        </Container>
    );
}

const Container = styled.div`
    width: 452px;
    height: 600px;

    position: relative;
`;

const Wrapper = styled.div`
    width: 100%;
    height: calc(600px - 80px);
    padding: 30px;

    border: 1px solid pink;
`;
