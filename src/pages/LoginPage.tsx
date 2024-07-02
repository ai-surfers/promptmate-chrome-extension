import styled from "styled-components";
import { useState } from "react";

export default function LoginPage() {
    const [token, setToken] = useState("");

    const loginWithGoogle = () => {
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
            if (chrome.runtime.lastError || !token) {
                chrome.tabs.create({
                    url: "https://accounts.google.com/signin",
                });
                return;
            }
            console.log("signed in!", token);
            setToken(token);
        });
    };

    const [msg, setMsg] = useState("");
    const callAPI = () => {
        fetch("https://promptmate.site/login")
            .then((res) => {
                console.log(res);
                setMsg(String(res.ok));
            })
            .catch((err) => {
                console.error(err);
                setMsg(err);
            });
    };

    return (
        <>
            <Button onClick={loginWithGoogle}>Login</Button>
            <div>Token - {token}</div>
            <Button onClick={callAPI}>API Test</Button>
            <div>Msg - {msg}</div>
        </>
    );
}

const Button = styled.button`
    margin: 0 auto;
`;
