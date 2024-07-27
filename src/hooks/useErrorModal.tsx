import { useEffect } from "react";
import { useModal } from "./useModal";
import LimitContent, {
    LimitFooter,
} from "../components/common/modal/content/LimitContent";
import eventEmitter, { EventType } from "../eventEmitter";

const useErrorModal = () => {
    const { openModal, closeModal } = useModal();

    useEffect(() => {
        const handleError = (message: string) => {
            openModal({
                title: "개인 프롬프트 저장소가 가득 찼어요!",
                content: <LimitContent text={message} />,
                footer: <LimitFooter closeModal={closeModal} />,
                callback: closeModal,
            });
        };

        eventEmitter.on(EventType.Error, handleError);

        return () => {
            eventEmitter.off(EventType.Error, handleError);
        };
    }, [openModal, closeModal]);
};

export default useErrorModal;
