import { Button, Modal } from "antd";
import styled from "styled-components";
import { openUrlInNewTab } from "../../../service/chrome/utils";

export interface NotSupportedModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

export default function NotSupportedModal({
    isOpen,
    closeModal,
}: NotSupportedModalProps) {
    const Footer = () => {
        function handleCopy() {
            const textToCopy = "요아정먹고싶다";
            navigator.clipboard
                .writeText(textToCopy)
                .then(() => {
                    alert("프롬프트가 클립보드에 복사되었습니다.");
                })
                .catch((err) => {
                    console.error("클립보드 복사 실패:", err);
                    alert("클립보드 복사에 실패했습니다.");
                });
        }
        function handleGoToGPT() {
            openUrlInNewTab("https://chatgpt.com/");
            closeModal();
        }

        return (
            <FooterContainer>
                <Button type="primary" onClick={handleCopy}>
                    프롬프트 복사
                </Button>
                <Button type="primary" onClick={handleGoToGPT}>
                    ChatGPT로 이동
                </Button>
            </FooterContainer>
        );
    };

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            onCancel={closeModal}
            footer={Footer}
        >
            <Title>플랫폼 안내</Title>
            <Text>
                현재 포켓 프롬프트에서 지원하지 않는 플랫폼입니다.
                <br /> <br />
                <b>지원 가능한 플랫폼</b>
                <br />• ChatGPT <br />• Gemini <br />• Claude
                <br /> <br />
                프롬프트를 복사하여 지원되는 플랫폼에서 사용하시겠습니까?
            </Text>
        </Modal>
    );
}

const Title = styled.h1`
    ${({ theme }) => theme.fonts.subtitle};
    color: ${({ theme }) => theme.colors.main};
    margin-bottom: 20px;
`;

const Text = styled.div`
    ${({ theme }) => theme.fonts.modal};
    color: ${({ theme }) => theme.colors.deep_gray};

    b {
        font-weight: 600;
    }
`;

const FooterContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column")};
    gap: 10px;
    margin-top: 30px;

    button {
        width: 100%;
    }
`;
