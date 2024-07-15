import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../../../hooks/useUser";
import { removeFromStorage } from "../../../service/chrome/storage";
import { ACCESS_TOKEN } from "../../../service/chrome/storage.keys";
import { useModal } from "../../../hooks/useModal";

interface HeaderProps {
    title: string;
    canGoBack?: boolean;
}

export default function Header({ title, canGoBack }: HeaderProps) {
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const { userData, resetUserState } = useUser();

    function handleOnLogout() {
        openModal({
            content: "로그아웃하시겠습니까? ",
            callback: function logout() {
                resetUserState();
                removeFromStorage(ACCESS_TOKEN);

                navigate(`/`, { replace: true });
                closeModal();
            },
        });
    }

    return (
        <HeaderContainer>
            <div>{title}</div>

            {canGoBack && (
                <ImageWrapper position="left">
                    <img
                        src="/images/ic_arrow.svg"
                        alt="ic_back"
                        onClick={() => navigate(-1)}
                    />
                </ImageWrapper>
            )}

            {userData.isLogin && (
                <ImageWrapper position="right" onClick={handleOnLogout}>
                    <img
                        src="/images/ic_person.svg"
                        alt="ic_person"
                        style={{ width: "18px", height: "18px" }}
                    />
                    <span>{userData.user?.nickname}</span>
                </ImageWrapper>
            )}
        </HeaderContainer>
    );
}

const HeaderContainer = styled.header`
    width: 100%;
    height: 60px;
    background: #070944;
    color: #c9c6eb;

    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    padding: 0 40px;
    ${({ theme }) => theme.mixins.flexBox()};
    ${({ theme }) => theme.fonts.title};
`;

const ImageWrapper = styled.div<{
    position?: "left" | "right";
}>`
    ${({ theme }) => theme.mixins.flexBox()};
    ${({ theme }) => theme.fonts.placeholder};
    gap: 5px;

    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    ${({ position }) => position}: 20px;

    cursor: pointer;

    > span {
        max-width: 50px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;
