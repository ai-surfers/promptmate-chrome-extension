import { useRecoilState } from "recoil";
import { useCallback } from "react";
import { alertState } from "../states/alertState";

/**
 * useAlert Hook
 * @props content(*) - 알럿 내부에 들어갈 컨텐츠
 * @props callback - 확인 클릭 시 실행될 함수
 */
interface AlertProps {
    content: JSX.Element | string;
    callback?: () => any;
}

export const useAlert = () => {
    const [alertData, setAlertData] = useRecoilState(alertState);

    const closeAlert = useCallback(() => {
        setAlertData((prev) => ({
            ...prev,
            isOpen: false,
        }));
    }, [setAlertData]);

    const openAlert = useCallback(
        ({ content, callback }: AlertProps) => {
            setAlertData({
                isOpen: true,
                content: content,
                callBack: callback ? callback : closeAlert,
            });
        },
        [setAlertData, closeAlert]
    );

    return { alertData, closeAlert, openAlert };
};
