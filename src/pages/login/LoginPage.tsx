import styled from "styled-components";
import { getUser, login } from "../../service/auth/auth";
import {
    getFromStorage,
    removeFromStorage,
    setToStorage,
} from "../../service/chrome/storage";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, ONBOARING } from "../../service/chrome/storage.keys";
import { useAlert } from "../../hooks/useAlert";
import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import CustomHeader from "@/components/common/header/AHeader";

export default function LoginPage() {
    const navigate = useNavigate();
    const { openAlert, closeAlert } = useAlert();
    const { setUser, setAccessToken, resetUserState } = useUser();

    // 첫 렌더링 시,
    // 1. 온보딩 여부 확인
    // 2. 자동 로그인 여부 확인
    useEffect(function checkOnboarding() {
        getFromStorage(ONBOARING, (value) => {
            console.log("[ONBOARING]", value);
            if (value) {
                checkAutoLogin();
                return;
            }

            navigate("/tutorial");
        });

        // eslint-disable-next-line
    }, []);

    function checkAutoLogin() {
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
    }

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
                removeFromStorage(ACCESS_TOKEN);
                resetUserState();

                handleError(`[${error.code}] ${error.message}`);
            });
    };

    // 1) signInWithPopup으로 google auth token
    const handleIframeMessage = (event: MessageEvent) => {
        const { data } = event;

        if (typeof data === "string" && data.startsWith("!_{")) return;

        let jsonData;
        try {
            if (typeof data === "string") {
                jsonData = JSON.parse(data);
            } else {
                jsonData = data;
            }
        } catch (error) {
            console.log("Invalid JSON format", error);
            return;
        }

        console.log("jsonData >> ", jsonData);

        const token = jsonData.token;
        const user = jsonData.user;

        console.log("token >> ", token);
        console.log("user >> ", user);

        if (token) {
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
                    console.log("!저장", data.access_token);
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
        } else if (jsonData.error) {
            handleError(data.error);
        }
    };

    const handleError = (msg: string) => {
        console.log(msg);
        openAlert({
            content: msg,
        });
    };

    useEffect(() => {
        window.addEventListener("message", handleIframeMessage);
        return () => {
            window.removeEventListener("message", handleIframeMessage);
        };

        // eslint-disable-next-line
    }, []);

    return (
        <LoginPageContainer>
            <CustomHeader title="Pocket Prompt" />
            <IframeContainer>
                <iframe
                    src="https://prompt-mate-d3b25.web.app"
                    title="Google Login"
                    width="100%"
                    height="100%"
                    style={{ border: "none" }}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                ></iframe>
            </IframeContainer>
        </LoginPageContainer>
    );
}

const LoginPageContainer = styled.section`
    max-width: 452px;

    width: 100vw;
    height: 100vh;

    background: #fff;

    margin: 0 auto;
    overflow: scroll;

    position: relative;

    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
`;

const IframeContainer = styled.div`
    max-width: 452px;
    width: 100vw;
    height: calc(100% - 60px);
    ${({ theme }) => theme.mixins.flexBox("column", "center", "center")};
`;
