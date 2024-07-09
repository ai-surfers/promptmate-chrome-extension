import styled from "styled-components";
import { login } from "../../service/auth/auth";
import { setToStorage } from "../../service/chrome/storage";
import { getAuthToken } from "../../service/chrome/identity";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../service/chrome/storage.keys";
import GoogleLogin from "../../components/login/GoogleButton";
import Alert from "../../components/common/Alert";
import { useState } from "react";

export default function LoginPage() {
    const navigate = useNavigate();
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showFailAlert, setShowFailAlert] = useState(false);

    /**
     * Login With Google
     */
    const loginWithGoogle = async () => {
        // 1) chrome API로 google auth token
        getAuthToken((token) => {
            if (token === "") {
                alert("Failed!");
                return;
            }

            // 2) 로그인 API 호출
            login(token).then((res) => {
                console.log(res);

                if (res.data.access_token) {
                    setToStorage(ACCESS_TOKEN, res.data.access_token, () => {
                        setShowSuccessAlert(true);
                    });
                }
            });
        });
    };

    function success() {
        setShowSuccessAlert(false);
        navigate("/home");
    }

    return (
        <LoginPageContainer>
            <GoogleLogin onClick={loginWithGoogle} />

            {showSuccessAlert && (
                <Alert msg="로그인에 성공하였습니다." onClick={success} />
            )}
            {showFailAlert && <Alert msg="로그인에 실패하였습니다." />}
        </LoginPageContainer>
    );
}

const LoginPageContainer = styled.section`
    width: 100%;
    min-height: 100%;

    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
`;
