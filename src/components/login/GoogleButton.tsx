import styled from "styled-components";

interface GoogleButtonProps {
    onClick?: () => void;
}

export default function GoogleLoginButton({ onClick }: GoogleButtonProps) {
    return (
        <ButtonContainer onClick={onClick}>
            <img src="/images/logo_google.svg" alt="google" />
            Continue with Google
        </ButtonContainer>
    );
}

const ButtonContainer = styled.button`
    ${({ theme }) => theme.mixins.flexBox()};
    ${({ theme }) => theme.fonts.button};

    padding: 6px 30px;
    margin: 5px 0;

    border-radius: 40px;
    border: 1px solid ${({ theme }) => theme.colors.main};
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.main};

    img {
        margin-right: 5px;
    }

    &:hover {
        background: ${({ theme }) => theme.colors.main_light};
        color: ${({ theme }) => theme.colors.white};
    }
`;
