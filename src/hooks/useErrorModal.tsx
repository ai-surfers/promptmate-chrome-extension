import { useEffect } from "react";
import { useModal } from "./useModal";
import LimitContent, {
    LimitFooter,
} from "../components/common/modal/content/LimitContent";
import eventEmitter, { ErrorArgs, EventType } from "../eventEmitter";
import { AxiosHeaders } from "axios";

const useErrorModal = () => {
    const { openModal, closeModal } = useModal();

    const handleError = (args: ErrorArgs) => {
        if (args.code === 402) openLimitModal(args.message, args.headers);
        else openErrorModal(args.message);
    };

    function openLimitModal(message: string, headers?: AxiosHeaders) {
        const utm_campaign = headers?.["utm_campaign"];

        openModal({
            title: "개인 프롬프트 저장소가 가득 찼어요!",
            content: <LimitContent text={message} />,
            footer: (
                <LimitFooter closeModal={closeModal} campaign={utm_campaign} />
            ),
            callback: closeModal,
        });
    }

    function openErrorModal(message: string) {
        openModal({
            title: message,
            callback: closeModal,
        });
    }

    useEffect(() => {
        eventEmitter.on(EventType.Error, handleError);

        return () => {
            eventEmitter.off(EventType.Error, handleError);
        };
    });
};

export default useErrorModal;
