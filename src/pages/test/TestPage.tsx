import styled from "styled-components";
import GoogleLoginButton from "../../components/login/GoogleButton";
import { getFromStorage, setToStorage } from "../../service/chrome/storage";
import { ACCESS_TOKEN } from "../../service/chrome/storage.keys";
import { sendWindowMessage } from "../../service/chrome/messaging";
import { login } from "../../service/auth/auth";
import { getAuthToken } from "../../service/chrome/functions";

export default function TestPage() {
    function sendChromeMessage() {
        getAuthToken(({ success, detail, data }) => {
            if (!success) {
                alert(detail);
                return;
            }

            const token = data.token;
            login(token)
                .then((res) => {
                    const { success, detail, data } = res.data;

                    if (!success) {
                        console.error(`${detail}`);
                        alert(detail);
                        return;
                    }

                    // 성공 시, 스토리지에 저장 후 로그인 화면으로 이동
                    setToStorage(ACCESS_TOKEN, data.access_token, () => {
                        alert(detail);
                        // openAlert({
                        //     content: detail,
                        //     callback: () => {
                        //         navigate("/home");
                        //         closeAlert();
                        //     },
                        // });
                    });
                })
                .catch((error) => {
                    console.error(error);
                    alert(`[${error.code}] ${error.message}`);
                });
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
