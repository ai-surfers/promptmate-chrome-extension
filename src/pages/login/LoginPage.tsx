import styled from "styled-components";
import { useState } from "react";
import { login } from "../../service/auth/auth";

export default function LoginPage() {
    const [token, setToken] = useState("");
    const [msg, setMsg] = useState("");

    const callAPI = async () => {
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
            if (chrome.runtime.lastError || !token) {
                chrome.tabs.create({
                    url: "https://accounts.google.com/signin",
                });
                return;
            }
            console.log("signed in!", token);

            setToken(token);

            login(token).then((res) => {
                console.log(res);
                setMsg(res.data.access_token || "성공");
            });
        });
    };

    return (
        <>
            <Button onClick={callAPI}>API Test</Button>
            <div>Token - {token}</div>
            <div>Msg - {msg}</div>
        </>
    );
}

const Button = styled.button`
    margin: 0 auto;
`;
