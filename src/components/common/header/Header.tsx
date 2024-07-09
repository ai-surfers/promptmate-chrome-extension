import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface HeaderProps {
    title: string;
    isLogin?: boolean;
    canGoBack?: boolean;
}

export default function Header({ title, isLogin, canGoBack }: HeaderProps) {
    const navigate = useNavigate();

    return (
        <HeaderWrapper>
            <div>{title}</div>

            {canGoBack && (
                <ImageButton
                    src="/images/ic_arrow.svg"
                    alt="ic_back"
                    imagePosition="left"
                    onClick={() => navigate(-1)}
                />
            )}

            {isLogin && (
                <ImageButton
                    src="/images/ic_person.svg"
                    alt="ic_person"
                    imagePosition="right"
                />
            )}
        </HeaderWrapper>
    );
}

const HeaderWrapper = styled.header`
    width: 100%;
    max-width: 452px;
    height: 60px;
    background: #070944;
    color: #c9c6eb;

    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    padding: 0 40px;
    ${({ theme }) => theme.mixins.flexBox("row")};
    ${({ theme }) => theme.fonts.title};
`;

const ImageButton = styled.img<{
    imagePosition?: "left" | "right";
}>`
    position: absolute;
    top: 50%;
    ${({ imagePosition }) => imagePosition}: 20px;
    transform: translateY(-50%);

    cursor: pointer;
`;
