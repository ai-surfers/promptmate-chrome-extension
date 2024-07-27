import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../../../hooks/useUser";
import { removeFromStorage } from "../../../service/chrome/storage";
import { ACCESS_TOKEN } from "../../../service/chrome/storage.keys";
import { useModal } from "../../../hooks/useModal";
import { Header } from "antd/es/layout/layout";
import Avatar from "antd/es/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";
import LimitContent, { LimitFooter } from "../modal/content/LimitContent";

interface HeaderProps {
    title: string;
    canGoBack?: boolean;
}

export default function CustomHeader({ title, canGoBack }: HeaderProps) {
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();
    const { userData, resetUserState } = useUser();

    function handleOnLogout() {
        openModal({
            title: "로그아웃하시겠습니까? ",
            callback: function logout() {
                resetUserState();
                removeFromStorage(ACCESS_TOKEN);

                navigate(`/`, { replace: true });
                closeModal();
            },
        });
    }

    function handleOnLimit() {
        openModal({
            title: "개인 프롬프트 저장소가 가득 찼어요!",
            content: <LimitContent />,
            footer: <LimitFooter closeModal={closeModal} />,
            callback: function logout() {
                closeModal();
            },
        });
    }

    return (
        <Header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                width: "100%",
                height: "60px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
                padding: "0 20px",
                fontFamily: "Suit",
            }}
        >
            <LeftContainer>
                {canGoBack && (
                    <ImageWrapper>
                        <img
                            src="/images/ic_arrow.svg"
                            alt="ic_back"
                            onClick={() => navigate(-1)}
                        />
                    </ImageWrapper>
                )}

                <Title>{title}</Title>
            </LeftContainer>
            {userData.isLogin && (
                <ImageWrapper onClick={handleOnLogout}>
                    <Avatar size={30} icon={<UserOutlined />} />
                    <span>{userData.user?.nickname}</span>
                </ImageWrapper>
            )}

            <ImageWrapper onClick={handleOnLimit}>
                <Avatar size={30} icon={<UserOutlined />} />
                <span>{userData.user?.nickname}</span>
            </ImageWrapper>
        </Header>
    );
}

const LeftContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox()};
`;

const Title = styled.div`
    margin-left: 10px;
`;

const ImageWrapper = styled.div`
    ${({ theme }) => theme.mixins.flexBox()};
    ${({ theme }) => theme.fonts.placeholder};
    gap: 5px;

    cursor: pointer;

    > span {
        max-width: 50px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;
