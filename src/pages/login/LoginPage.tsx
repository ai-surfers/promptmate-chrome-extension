import styled from "styled-components";
import { getUser, login } from "../../service/auth/auth";
import {
    getFromStorage,
    removeFromStorage,
    setToStorage,
} from "../../service/chrome/storage";
import { getAuthToken } from "../../service/chrome/utils";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../service/chrome/storage.keys";
import GoogleLogin from "../../components/login/GoogleButton";
import { useAlert } from "../../hooks/useAlert";
import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";

export default function LoginPage() {
    const navigate = useNavigate();
    const { openAlert, closeAlert } = useAlert();
    const { setUser, setAccessToken, resetUserState } = useUser();

    // 첫 렌더링 시, 자동 로그인 여부 확인
    useEffect(function checkAutoLogin() {
        // 1. 스토리지에서 액세스 토큰 확인
        getFromStorage(ACCESS_TOKEN, (value) => {
            setAccessToken(value);

            if (!value) {
                resetUserState();
                return;
            }

            // 2. 토큰 유효성 확인 (/my)
            getUserInfo();
        });

        // eslint-disable-next-line
    }, []);

    /**
     * Update User State
     */
    const getUserInfo = () => {
        getUser()
            .then((res) => {
                console.log(">> ", res.data);
                const { success, detail, data } = res.data;

                if (!success) {
                    removeFromStorage(ACCESS_TOKEN);
                    resetUserState();

                    handleError(`${detail}`);
                    return;
                }

                // 성공, 저장하고 홈으로 이동
                setUser(data);
                navigate("/home");
            })
            .catch((error) => {
                handleError(`[${error.code}] ${error.message}`);
            });
    };

    /**
     * Login With Google
     */
    const loginWithGoogle = async () => {
        // 1) chrome API로 google auth token
        getAuthToken((token) => {
            if (token === "") {
                openAlert({
                    content: "Google 로그인 후 이용 가능합니다. ",
                });
                return;
            }

            // 2) 로그인 API 호출
            login(token)
                .then((res) => {
                    const { success, detail, data } = res.data;

                    if (!success) {
                        removeFromStorage(ACCESS_TOKEN);
                        resetUserState();

                        handleError(`${detail}`);
                        return;
                    }

                    // 성공 시, 스토리지에 저장 & 유저 조회 후 로그인 화면으로 이동
                    setToStorage(ACCESS_TOKEN, data.access_token, () => {
                        openAlert({
                            content: detail,
                            callback: () => {
                                closeAlert();
                                getUserInfo();
                            },
                        });
                    });
                })
                .catch((error) => {
                    handleError(`[${error.code}] ${error.message}`);
                });
        });
    };

    const handleError = (msg: string) => {
        console.error(msg);
        openAlert({
            content: msg,
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
    padding: 40px;

    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
`;
