import styled from "styled-components";
import GoogleLoginButton from "../../components/login/GoogleButton";

export default function TestPage() {
    return (
        <LoginPageContainer>
            <div>Hello</div>
            <GoogleLoginButton />
        </LoginPageContainer>
    );
}

const LoginPageContainer = styled.section`
    width: 100%;
    height: 100%;
    border: 1px solid pink;
    padding: 40px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
