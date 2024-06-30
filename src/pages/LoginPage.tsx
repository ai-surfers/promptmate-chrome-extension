import styled from "styled-components";
import { auth, provider, signInWithPopup } from "../firebase/firebase";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useState } from "react";

export default function LoginPage() {
    const [res, setRes] = useState("");
    async function login() {
        console.log("CLik!");
        // try {
        //     const result = await signInWithPopup(auth, provider);
        //     const user = result.user;
        //     const credential = GoogleAuthProvider.credentialFromResult(result);
        //     if (credential) {
        //         const token = credential.accessToken;
        //         console.log("Access Token:", token);
        //     }
        //     console.log("User info:", user);
        // } catch (error) {
        //     console.error("Login error:", error);
        // }
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            if (chrome.runtime.lastError) {
                console.error("Error:", chrome.runtime.lastError.message);
                return;
            }
            console.log("Token:", token);
            // 토큰을 얻었을 때 수행할 추가적인 작업을 여기에 추가합니다.
        });
    }

    const loginWithGoogle = () => {
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
            if (chrome.runtime.lastError || !token) {
                chrome.tabs.create({
                    url: "https://accounts.google.com/signin",
                });
                return;
            }
            console.log("signed in!", token);
            setRes(token);
        });
    };

    return (
        <>
            <Button onClick={loginWithGoogle}>Login</Button>
            <div>Token - {res}</div>
        </>
    );
}

const Button = styled.button`
    margin: 0 auto;
`;
