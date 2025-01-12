import BookMark from "@/assets/Bookmark";
import { button } from "@/styles/mixins/button";
import { ArrowLeft, Send } from "iconsax-react";
import { useNavigate } from "react-router";
import { css, cva } from "styled-system/css";
import { flex } from "styled-system/patterns";

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className={header}>
            <div className={container.left}>
                <ArrowLeft
                    size={24}
                    className={css({
                        color: "gray.600",
                        cursor: "pointer",
                    })}
                    onClick={() => navigate(-1)}
                />

                <div>프롬프트 사용하기</div>
            </div>

            <div className={container.right}>
                <div className={button({ hierarchy: "secondary" })}>
                    <Send size={20} />
                </div>
                <div className={button({ hierarchy: "normal" })}>
                    <BookMark stroke="#7580EA" height={20} />
                </div>
            </div>
        </div>
    );
};

const header = flex({
    pos: "sticky",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    width: "full",
    height: "60px",
    justify: "space-between",
    align: "center",
    bg: "white",
    p: "10px 20px",
});

const container = {
    left: flex({
        gap: "16px",
        color: "gray.800",
        textStyle: "b2_16_med",
    }),
    right: flex({
        gap: "12px",
    }),
};

export default Header;
