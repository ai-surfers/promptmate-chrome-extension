import styled from "styled-components";
import { useState } from "react";
import { login } from "../../service/auth/auth";
import {
    getAccessTokenFromStorage,
    setAccessTokenInStorage,
} from "../../service/chrome/storage";
import { getAuthToken } from "../../service/chrome/identity";
import { LoginResponse } from "../../service/auth/auth.model";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [token, setToken] = useState("");
    const [msg, setMsg] = useState("");
    const [accessToken1, setAccessToken1] = useState("");
    const [accessToken2, setAccessToken2] = useState("");

    const getAccessToken = () => {
        getAccessTokenFromStorage((token) => {
            setAccessToken2(token);
        });
    };

    const callAPI = async () => {
        getAuthToken((token) => {
            setToken(token);

            login(token).then(
                (res: {
                    data: {
                        access_token: string;
                    };
                }) => {
                    console.log(res);
                    setMsg(res.data.access_token || "성공");

                    setAccessTokenInStorage(res.data.access_token, () => {
                        setAccessToken1(res.data.access_token);
                    });
                }
            );
        });
    };

    const navigate = useNavigate();

    return (
        <>
            <Button onClick={callAPI}>API Test</Button>
            <div>Token - {token}</div>
            <div>Msg - {msg}</div>

            <br />
            <br />

            <Button onClick={getAccessToken}>Storage Test</Button>
            <div>Set Access Token - {accessToken1}</div>
            <div>Get Access Token - {accessToken2}</div>

            <br />
            <br />
            <h3>Page List</h3>
            <Button onClick={() => navigate("/home")}>Home</Button>
            <Button onClick={() => navigate("/template")}>Template</Button>
            <Button onClick={() => navigate("/prompt")}>Prompt</Button>
        </>
    );
}

const Button = styled.button`
    margin: 0 auto;
`;
