import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";

export default function Layout() {
    return (
        <Wrapper>
            <Header />
            <Container>
                <Outlet />
            </Container>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 800px;
    height: 600px;

    position: relative;
`;

const Container = styled.div`
    width: 100%;
    height: calc(600px - 80px);

    border: 1px solid pink;
`;
