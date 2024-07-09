import styled from "styled-components";

export default function Header() {
    return <HeaderWrapper>프롬프트 메이트</HeaderWrapper>;
}

const HeaderWrapper = styled.header`
    width: 100%;
    height: 80px;
    background: #070944;
    color: #c9c6eb;

    position: sticky;
    top: 0;
    left: 0;

    ${({ theme }) => theme.mixins.flexBox()};
    ${({ theme }) => theme.fonts.title};
`;
