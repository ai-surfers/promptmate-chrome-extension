import { css, keyframes } from 'styled-components';

/** 컬러 코드 나오면 추가 될 예정 */
const colors = {
	white: '#FFFFFF',
	black: '#181B29',
	gray: '#818491',
	light_gray: '#DEE0E8',
	deep_gray: '#202232',
	main: '#7580EA',
	main_light: '#9EADFC',
	main_gray: '#3E4151',
	G_01: '#F8F8F8',
	G_02: '#EBE9EA',
	G_03: '#ECEEF4',
	G_04: '#D3CFD1',
	G_05: '#CAC6C8',
	G_06: '#BDBDBD',
	G_07: '#757373',
	G_08: '#868384',
	G_09: '#686566',
	G_10: '#BDBDBD',
	G_11: '#848485',
	G_12: '#EEEEEE',
	G_13: '#F3F4F6',
};

/** 폰트 결정 시 수정 될 예정 */
const fonts = {
	title: css`
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: 160%;
        text-align: center;
    `,
	subtitle: css`
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 160%;
    `,
	button: css`
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 100%;
        text-align: center;
    `,
	modal: css`
        font-size: 14px;
        font-style: normal;
        line-height: 160%; /* 1.8rem */
        text-align: center;
    `,
	h2: css`
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 160%; /* 1.8rem */
    `,
	h3: css`
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 160%; /* 1.8rem */
    `,
	input: css`
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%; /* 1.8rem */
    `,
	placeholder: css`
        font-size: 14px;
        font-style: normal;
        font-weight: 300;
        line-height: 130%; /* 1.8rem */
    `,
	select: css`
        font-size: 12px;
        font-style: normal;
        font-weight: 300;
        line-height: 100%;
    `,
	option: css`
        font-size: 14px;
        font-style: normal;
        font-weight: 300;
        line-height: 100%;
    `,
	tab: css`
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 100%;
    `,
	heading_01: css`
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 125%;
    `,
	description: css`
        font-size: 16px;
        font-weight: 400;
        line-height: 140%;
        text-align: center;
    `,
	tutorial_title: css`
        font-size: 24px;
        font-weight: 700;
        line-height: 140%;
        text-align: center;
    `,
	tutorial_desc: css`
        font-size: 16px;
        font-weight: 400;
        line-height: 140%;
        text-align: center;
    `,
};

/* 믹스인 */
const mixins = {
	flexBox: (direction = 'row', justify = 'center', align = 'center') => css`
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

	blinkOutline: () => {
		const blink = keyframes`
        0% {
          outline-color: transparent;
        }
        50% {
          outline-color: #ff0000; // Customize the outline color as needed
        }
        100% {
          outline-color: transparent;
        }
      `;

		return css`
            animation: ${blink} 1s ease-in-out infinite;
        `;
	},
};

const theme = { colors, fonts, mixins };

export default theme;
