import { css, keyframes } from "styled-components";

/** 컬러 코드 나오면 추가 될 예정 */
const colors = {
    white: "#FFFFFF",
    black: "#1E1E1E",
    gray: "#94A3B8",
    light_gray: "#F3F4F6",
    deep_gray: "#727272",
    main: "#070944",
    main_light: "#5D5A88",
    main_gray: "#9CA3AF",
    G_01: "#F8F8F8",
    G_02: "#EBE9EA",
    G_03: "#ECEEF4",
    G_04: "#D3CFD1",
    G_05: "#CAC6C8",
    G_06: "#BDBDBD",
    G_07: "#757373",
    G_08: "#868384",
    G_09: "#686566",
    G_10: "#BDBDBD",
    G_11: "#848485",
    G_12: "#EEEEEE",
    G_13: "#F3F4F6",
};

/** 폰트 결정 시 수정 될 예정 */
const fonts = {
    title: css`
        font-family: Suit;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: 160%;
        text-align: center;
    `,
    subtitle: css`
        font-family: Suit;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 160%;
    `,
    button: css`
        font-family: Suit;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 100%;
        text-align: center;
    `,
    modal: css`
        font-family: Suit;
        font-size: 14px;
        font-style: normal;
        line-height: 160%; /* 1.8rem */
        text-align: center;
    `,
    h2: css`
        font-family: Suit;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 160%; /* 1.8rem */
    `,
    h3: css`
        font-family: Suit;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 160%; /* 1.8rem */
    `,
    input: css`
        font-family: Suit;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%; /* 1.8rem */
    `,
    placeholder: css`
        font-family: Suit;
        font-size: 14px;
        font-style: normal;
        font-weight: 300;
        line-height: 130%; /* 1.8rem */
    `,
    select: css`
        font-family: Suit;
        font-size: 12px;
        font-style: normal;
        font-weight: 300;
        line-height: 100%;
    `,
    option: css`
        font-family: Suit;
        font-size: 14px;
        font-style: normal;
        font-weight: 300;
        line-height: 100%;
    `,
    tab: css`
        font-family: Suit;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
    `,
    heading_01: css`
        font-family: Suit;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 125%;
    `,
    description: css`
        font-family: "Suit";
        font-size: 1rem;
        font-weight: 500;
    `,
};

/* 믹스인 */
const mixins = {
    flexBox: (direction = "row", justify = "center", align = "center") => css`
        display: flex;
        flex-direction: ${direction};
        align-items: ${align};
        justify-content: ${justify};
    `,
    skeleton: () => {
        const moveRight = keyframes`
      0% {
        transform: translateX(-200%);
      }
      100% {
        transform: translateX(1100%);
      }
    `;

        return css`
            position: relative;

            background: #e5e7eb;
            overflow: hidden;

            &::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 10%;
                height: 100%;
                background: #d1d5db;
                box-shadow: 0px 0px 50px 30px #d1d5db;
                animation: ${moveRight} 1s infinite linear;
            }
        `;
    },
};

const theme = { colors, fonts, mixins };

export default theme;
