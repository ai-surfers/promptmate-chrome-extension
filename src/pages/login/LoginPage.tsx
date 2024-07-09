import styled from "styled-components";
import { login } from "../../service/auth/auth";
import { setToStorage } from "../../service/chrome/storage";
import { getAuthToken } from "../../service/chrome/identity";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../service/chrome/storage.keys";
import GoogleLogin from "../../components/login/GoogleButton";
import { useAlert } from "../../hooks/useAlert";

export default function LoginPage() {
    const navigate = useNavigate();
    const { openAlert, closeAlert } = useAlert();

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
                        openAlert({
                            content: "로그인에 성공하였습니다.",
                            callback: () => {
                                navigate("/home");
                                closeAlert();
                            },
                        });
                    });
                }
            });
        });
    };

    return (
        <LoginPageContainer>
            <GoogleLogin onClick={loginWithGoogle} />
        </LoginPageContainer>
    );
}

const LoginPageContainer = styled.section`
    width: 100%;
    min-height: 100%;

    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
`;
