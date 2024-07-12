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
    display: flex;
    align-items: center;

    padding: 6px 30px;
    margin: 5px 0;

    border-radius: 40px;
    border: 1px solid blue;
    background: white;
    color: black;

    img {
        margin-right: 5px;
    }

    &:hover {
        background: pink;
    }
`;
