import styled from "styled-components";
import { login } from "../../service/auth/auth";
import { setToStorage } from "../../service/chrome/storage";
import { getAuthToken } from "../../service/chrome/identity";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../service/chrome/storage.keys";
import GoogleLogin from "../../components/login/GoogleButton";
import { useAlert } from "../../hooks/useAlert";
import Button from "../../components/common/Button";

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
                showErrorAlert("Google 로그인 후 이용 가능합니다. ");
                return;
            }

            // 2) 로그인 API 호출
            login(token)
                .then((res) => {
                    const { success, detail, data } = res.data;

                    if (!success) {
                        console.error(`${detail}`);
                        showErrorAlert(detail);
                        return;
                    }

                    // 성공 시, 스토리지에 저장 후 로그인 화면으로 이동
                    setToStorage(ACCESS_TOKEN, data.access_token, () => {
                        openAlert({
                            content: detail,
                            callback: () => {
                                navigate("/home");
                                closeAlert();
                            },
                        });
                    });
                })
                .catch((error) => {
                    console.error(error);
                    showErrorAlert(`[${error.code}] ${error.message}`);
                });
        });
    };

    function showErrorAlert(msg: string) {
        openAlert({
            content: msg,
            callback: closeAlert,
        });
    }

    return (
        <LoginPageContainer>
            <GoogleLogin onClick={loginWithGoogle} />
            <Button
                title="프롬프트 페이지"
                onClick={() => navigate("/prompt")}
            />
        </LoginPageContainer>
    );
}

const LoginPageContainer = styled.section`
    width: 100%;
    min-height: 100%;

    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
`;
