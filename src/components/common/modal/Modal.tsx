import styled from "styled-components";
import Button from "../button/Button";
import { useModal } from "../../../hooks/useModal";

const Modal = () => {
    const { modalData, closeModal } = useModal();

    return (
        <>
            {modalData.isOpen && (
                <>
                    <Overlay />
                    <ModalContainer>
                        <ModalContent>{modalData.content}</ModalContent>
                        <ButtonContainer>
                            <Button
                                title="취소"
                                width="7.5rem;"
                                onClick={closeModal}
                            />
                            <Button
                                title="확인"
                                width="7.5rem"
                                onClick={modalData.callBack}
                            />
                        </ButtonContainer>
                    </ModalContainer>
                </>
            )}
        </>
    );
};

export default Modal;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const ModalContainer = styled.div`
    ${({ theme }) => theme.fonts.modal};
    ${({ theme }) => theme.mixins.flexBox("column", "flex-end", "center")};
    gap: 2.8rem;

    width: 18.7rem;
    padding: 3.3rem 3.5rem 1rem 3.5rem;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 12px;
    background-color: white;
    z-index: 1000;
`;

const ModalContent = styled.div`
    ${({ theme }) => theme.mixins.flexBox()};
`;

const ButtonContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox()};
    gap: 0.5rem;
`;
