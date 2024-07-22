import { Card } from "antd";
import { GetPromptResponse } from "../../hooks/queries/prompt/useGetPrompt";

interface ListItemProps {
    prompt: GetPromptResponse;
    onClick: () => void;
}

export default function ListItem({ prompt, onClick }: ListItemProps) {
    return (
        <Card
            key={prompt.id}
            style={{ width: "100%" }}
            onClick={onClick}
            extra={<a>사용하기</a>}
            title={prompt.title}
        >
            <div style={{ fontWeight: "700" }}></div>

            <div style={{ color: "#727272" }}>{prompt.description}</div>
        </Card>
    );
}
