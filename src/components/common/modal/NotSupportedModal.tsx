import { openUrlInNewTab } from "@/service/chrome/tabs";
import { Button, Modal } from "antd";
import styled from "styled-components";

export interface NotSupportedModalProps {
    isOpen: boolean;
    prompt: string;
    closeModal: () => void;
}

export default function NotSupportedModal({
    prompt,
    isOpen,
    closeModal,
}: NotSupportedModalProps) {
    const Footer = () => {
        function handleCopy() {
            if (!prompt) {
                alert("복사할 프롬프트가 없습니다.");
                return;
            }

            navigator.clipboard
                .writeText(prompt)
                .then(() => {
                    alert("프롬프트가 클립보드에 복사되었습니다.");
                    closeModal();
                })
                .catch((err) => {
                    console.log("클립보드 복사 실패:", err);
                    alert("클립보드 복사에 실패했습니다.");
                });
        }

        return (
            <FooterContainer>
                <Button type="primary" onClick={() => closeModal()}>
                    확인
                </Button>
            </FooterContainer>
        );
    };

    function handleGoToPlatform(url: string) {
        openUrlInNewTab(url);
        closeModal();
    }

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            onCancel={closeModal}
            footer={<Footer />}
        >
            <Title>플랫폼 안내</Title>
            <Text>
                원클릭 프롬프트 실행을 위해
                <br /> ChatGPT로 이동합니다.
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

const Link = styled.span`
    text-decoration: underline;
    cursor: pointer;
`;

const FooterContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("column")};
    gap: 10px;
    margin-top: 30px;

    button {
        width: 100%;
    }
`;
