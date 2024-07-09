import styled from "styled-components";
import { useState } from "react";
import { login } from "../../service/auth/auth";
import { getFromStorage, setToStorage } from "../../service/chrome/storage";
import { getAuthToken } from "../../service/chrome/identity";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../service/chrome/storage.keys";
import Button from "../../components/common/button/Button";
import GoogleLogin from "../../components/login/GoogleButton";

export default function LoginPage() {
    // const [token, setToken] = useState("");
    // const [msg, setMsg] = useState("");
    // const [accessToken1, setAccessToken1] = useState("");
    // const [accessToken2, setAccessToken2] = useState("");

    // const getAccessToken = () => {
    //     getFromStorage(ACCESS_TOKEN, (token) => {
    //         setAccessToken2(token);
    //     });
    // };

    // const callAPI = async () => {
    //     getAuthToken((token) => {
    //         if (token === "") {
    //             alert("Failed!");
    //             return;
    //         }

    //         setToken(token);
    //         login(token).then((res) => {
    //             console.log(res);
    //             if (res.data.access_token) {
    //                 setMsg(res.message);

    //                 setToStorage(ACCESS_TOKEN, res.data.access_token, () => {
    //                     setAccessToken1(res.data.access_token);
    //                 });
    //             }
    //         });
    //     });
    // };

    const navigate = useNavigate();

    return (
        <LoginPageContainer>
            <GoogleLogin />
            {/* <Button title="Google Login" width="40%" />
            <Button title="API Test" onClick={callAPI} />
            <div>Token - {token}</div>
            <div>Msg - {msg}</div>

            <br />
            <br />

            <Button title="Storage Test" onClick={getAccessToken} />
            <div>Set Access Token - {accessToken1}</div>
            <div>Get Access Token - {accessToken2}</div>

            <br />
            <br />
            <h3>Page List</h3>
            <Button title="Home" onClick={() => navigate("/home")} />
            <Button title="Template" onClick={() => navigate("/template")} />
            <Button title="Prompt" onClick={() => navigate("/prompt")} /> */}
        </LoginPageContainer>
    );
}

const LoginPageContainer = styled.section`
    width: 100%;
    min-height: 100%;

    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
`;
