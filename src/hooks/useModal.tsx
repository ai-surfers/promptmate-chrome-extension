import { useRecoilState } from "recoil";
import { modalState } from "../states/modalState";
import { useCallback } from "react";

/**
 * useModal Hook
 * @props content(*) - 모달 내부에 들어갈 컨텐츠
 * @props callback - 확인 클릭 시 실행될 함수
 */
interface ModalProps {
    content: JSX.Element | string;
    callback?: () => any;
}

export const useModal = () => {
    const [modalData, setModalData] = useRecoilState(modalState);

    const closeModal = useCallback(() => {
        setModalData((prev) => ({
            ...prev,
            isOpen: false,
        }));
    }, [setModalData]);

    const openModal = useCallback(
        ({ content, callback }: ModalProps) => {
            setModalData({
                isOpen: true,
                content: content,
                callBack: callback,
            });
        },
        [setModalData]
    );

    return { modalData, closeModal, openModal };
};
