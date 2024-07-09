import styled from "styled-components";
import Button from "./Button";

interface AlertProps {
    msg: string;
    onClick?: () => void;
}

const Alert = ({ msg, onClick }: AlertProps) => {
    return (
        <>
            <Overlay />
            <AlertContainer>
                <div>{msg}</div>
                <Button title="확인" onClick={onClick} />
            </AlertContainer>
        </>
    );
};

export default Alert;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const AlertContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column", "flex-end", "center")};
    ${({ theme }) => theme.fonts.modal_01};

    width: 18.7rem;
    padding: 3.3rem 3.5rem 1rem 3.5rem;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 12px;
    gap: 2.8rem;
    flex-shrink: 0;
    background-color: ${({ theme }) => theme.colors.white};
    z-index: 1000;
`;
