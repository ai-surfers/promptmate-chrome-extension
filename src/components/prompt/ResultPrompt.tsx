import { CaretRightFilled, CopyOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import styled from "styled-components";
import { copyClipboard } from "../../utils";

interface ResultPromptProps {
    prompt: string;
}
export default function ResultPrompt({ prompt }: ResultPromptProps) {
    function handleCopy(e: React.MouseEvent<HTMLElement>) {
        e.stopPropagation();
        copyClipboard(prompt)
            .then(() => {
                alert("프롬프트가 클립보드에 복사되었습니다.");
            })
            .catch((err) => {
                console.log("클립보드 복사 실패:", err);
                alert("클립보드 복사에 실패했습니다.");
            });
    }

    return (
        <Collapse
            expandIcon={({ isActive }) => (
                <CaretRightFilled rotate={isActive ? 90 : 0} />
            )}
            style={{ backgroundColor: "#F3F4F6" }}
            items={[
                {
                    key: "1",
                    label: (
                        <Title>
                            프롬프트{" "}
                            <CopyOutlined
                                onClick={handleCopy}
                                style={{ padding: "5px" }}
                            />
                        </Title>
                    ),
                    children: (
                        <>
                            <Item>{prompt}</Item>
                        </>
                    ),
                },
            ]}
        ></Collapse>
    );
}

const Title = styled.div`
    ${({ theme }) => theme.fonts.input};
    font-weight: 600;
`;

const Item = styled.p`
    ${({ theme }) => theme.fonts.input};

    cursor: pointer;
`;
