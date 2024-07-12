import styled from "styled-components";
import GoogleLoginButton from "../../components/login/GoogleButton";
import { getFromStorage, setToStorage } from "../../service/chrome/storage";
import { ACCESS_TOKEN } from "../../service/chrome/storage.keys";
import {
    sendRuntimeMessage,
    sendWindowMessage,
} from "../../service/chrome/messaging";

export default function TestPage() {
    function sendChromeMessage() {
        sendRuntimeMessage<{ token: string }>("getAuthToken", (response) => {
            alert(response.token);
        });
    }

    function sendWindMessage() {
        sendWindowMessage("windowmessage");
    }

    function setStorage() {
        const date = new Date().toISOString();
        setToStorage(ACCESS_TOKEN, date, () => {
            console.log(">> ");
        });
    }
    function getStorage() {
        getFromStorage(ACCESS_TOKEN, (value) => {
            console.log(">> ", value);
        });
    }

    return (
        <LoginPageContainer>
            <div>Hello</div>
            <GoogleLoginButton onClick={sendChromeMessage} />

            <button onClick={setStorage}>setStorage</button>
            <button onClick={getStorage}>getStorage</button>
            <button onClick={sendWindMessage}>window message</button>
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
