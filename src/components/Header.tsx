import React from "react";
import styled from "styled-components";

export default function Header() {
    return <HeaderWrapper>Prompt Mate</HeaderWrapper>;
}

const HeaderWrapper = styled.header`
    width: 100%;
    height: 80px;
    background: gray;
    display: flex;
    justify-content: center;
    align-items: center;

    position: sticky;
    top: 0;
    left: 0;
`;
