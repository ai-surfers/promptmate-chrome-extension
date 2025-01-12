import { useNavigate } from "react-router-dom";
import { removeFromStorage } from "../../../service/chrome/storage";
import { ACCESS_TOKEN } from "../../../service/chrome/storage.keys";
import { useModal } from "../../../hooks/useModal";
import { useUser } from "../../../hooks/useUser";
import { sendGAEvent } from "../../../utils/ga";
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";
import { User } from "iconsax-react";

export default function Header() {
    const navigate = useNavigate();
    const { openModal, closeModal } = useModal();

    const { userData, resetUserState } = useUser();

    function handleOnLogout() {
        sendGAEvent("click_logout");

        openModal({
            title: "로그아웃하시겠습니까? ",
            callback: function logout() {
                removeFromStorage(ACCESS_TOKEN);
                resetUserState();

                navigate(`/`, { replace: true });
                closeModal();
            },
        });
    }

    return (
        <div className={header}>
            <div className={container}>
                <img src="/images/logo_icon.png" />
            </div>

            {userData.isLogin && (
                <div className={profileContainer} onClick={handleOnLogout}>
                    <User
                        className={css({ color: "gray.500", flexShrink: 0 })}
                        size={16}
                    />
                    <span>{userData.user?.nickname}</span>
                </div>
            )}
        </div>
    );
}

const header = css({
    position: "sticky",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    width: "full",
    height: "60px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "white",
    padding: "10px 20px",
});

const container = flex({
    align: "center",
    color: "primary.100",
    "& img": {
        width: "40px",
        height: "40px",
    },
});

const profileContainer = flex({
    align: "center",
    gap: "8px",

    maxW: "1/2",
    px: "12px",
    py: "8px",

    border: "1.5px solid",
    borderColor: "gray.100",
    borderRadius: 40,

    textStyle: "c1_12_reg",
    cursor: "pointer",

    "& span": {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },
});
