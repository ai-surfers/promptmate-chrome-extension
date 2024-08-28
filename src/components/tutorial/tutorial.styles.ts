import styled from "styled-components";

const styles = {
    Container: styled.div`
        height: 100%;
        ${({ theme }) =>
            theme.mixins.flexBox("column", "space-between", "center")};
    `,
    Container2: styled.div`
        min-height: 100%;
        ${({ theme }) =>
            theme.mixins.flexBox("column", "flex-start", "center")};
    `,
    Title: styled.h3`
        ${({ theme }) => theme.fonts.tutorial_title};
    `,
    Subtitle: styled.p`
        ${({ theme }) => theme.fonts.tutorial_desc};
        color: ${({ theme }) => theme.colors.main_gray};
    `,

    Content: styled.p`
        ${({ theme }) => theme.fonts.tutorial_desc};
    `,

    Wrapper: styled.div`
        width: 100%;
        ${({ theme }) => theme.mixins.flexBox("column")};
        gap: 20px;
    `,
};
export default styles;
