import { atom } from "recoil";

type ModalType = {
    isOpen: boolean;
    content: JSX.Element | string;
    callBack?: () => any;
};

export const modalState = atom<ModalType>({
    key: "modalState",
    default: {
        isOpen: false,
        content: "",
    },
});
