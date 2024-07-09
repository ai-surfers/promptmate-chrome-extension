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
    background: #fff;
    margin: 0 auto;
    padding-top: 80px;

    position: relative;
    border: 1px solid pink;
`;

const Wrapper = styled.div`
    width: 100%;
    height: calc(600px - 80px);
    padding: 20px;
`;
