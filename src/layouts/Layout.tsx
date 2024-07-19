import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function Layout() {
    return (
        <Container>
            <Outlet />
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

export const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    background: #fff;

    padding: 20px 40px;
`;
