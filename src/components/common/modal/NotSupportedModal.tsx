import { Button, Modal } from "antd";
import styled from "styled-components";
import { openUrlInNewTab } from "../../../service/chrome/utils";

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
                    console.error("클립보드 복사 실패:", err);
                    alert("클립보드 복사에 실패했습니다.");
                });
        }

        return (
            <FooterContainer>
                {/* <Button type="primary" onClick={handleCopy}>
                    프롬프트 복사
                </Button> */}
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
                현재 포켓 프롬프트에서 지원되지 않는 플랫폼입니다.
                <br /> <br />
                <b>지원 가능한 플랫폼</b>
                <br />•
                <Link
                    onClick={() => handleGoToPlatform("https://chatgpt.com/")}
                >
                    ChatGPT
                </Link>
                <br />•
                <Link
                    onClick={() =>
                        handleGoToPlatform("https://gemini.google.com/")
                    }
                >
                    Gemini
                </Link>
                <br />•
                <Link onClick={() => handleGoToPlatform("https://claude.ai/")}>
                    Claude
                </Link>
                <br /> <br />
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
