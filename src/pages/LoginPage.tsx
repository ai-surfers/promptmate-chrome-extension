import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function LoginPage() {
    const navigate = useNavigate();

    function login() {
        navigate("/home");
    }

    return (
        <>
            <Button onClick={login}>Login</Button>
        </>
    );
}

const Button = styled.button`
    margin: 0 auto;
`;
