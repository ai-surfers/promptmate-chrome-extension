import styled from "styled-components";

interface HeaderProps {
    title: string;
}

export default function Header({ title }: HeaderProps) {
    return (
        <HeaderWrapper>
            <Title>{title}</Title>
        </HeaderWrapper>
    );
}

const HeaderWrapper = styled.header`
    width: 100%;
    height: 60px;
    background: #070944;
    color: #c9c6eb;

    position: fixed;
    top: 0;
    left: 0;

    padding: 0 40px;
    ${({ theme }) => theme.mixins.flexBox("row", "space-between")};
    ${({ theme }) => theme.fonts.title};
`;

const Title = styled.div``;
