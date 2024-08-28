import styled from "styled-components";

export interface ButtonProps {
    width?: string;
    title: string;
    enable?: boolean;
    onClick?: () => void;
}

export default function Button({
    width,
    title,
    enable = true,
    onClick,
}: ButtonProps) {
    function handleOnClick() {
        if (enable && onClick) {
            onClick();
        }
    }
    return (
        <ButtonContainer width={width} onClick={handleOnClick} $enable={enable}>
            {title}
        </ButtonContainer>
    );
}

const ButtonContainer = styled.button<{
    width?: string;
    height?: string;
    $enable?: boolean;
}>`
    ${({ theme }) => theme.fonts.button};

    width: ${({ width = "100%" }) => width};
    border-radius: 40px;
    border: 1px solid #5d5a88;
    padding: 15px 0;
    margin: 5px 0;

    background: ${({ theme, $enable = true }) =>
        $enable ? theme.colors.main : theme.colors.main_light};
    color: ${({ theme }) => theme.colors.white};

    &:hover {
        background: ${({ theme }) => theme.colors.main_light};
        color: ${({ theme }) => theme.colors.white};
    }
`;
