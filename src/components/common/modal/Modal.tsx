import styled from "styled-components";
import Button from "./../Button";
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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
`;
export const ModalContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    position: fixed;

    width: 18.7rem;

    padding: 3.3rem 3.5rem 1rem 3.5rem;

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 12px;
    gap: 2.8rem;
    flex-shrink: 0;
    background-color: white;
    z-index: 1000;
`;

export const ModalContent = styled.div`
    text-align: center;
    ${({ theme }) => theme.fonts.modal_01};
`;
