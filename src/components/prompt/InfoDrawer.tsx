import { Descriptions, Drawer } from "antd";
import { GetPromptResponse } from "../../service/prompt/prompt.model";

interface InfoDrawerProps {
    info: GetPromptResponse;
    isOpen: boolean;
    onClose: () => void;
}

export default function InfoDrawer({ isOpen, onClose, info }: InfoDrawerProps) {
    return (
        <Drawer open={isOpen} onClose={onClose} placement="bottom">
            <Descriptions title={info?.title} size="small">
                <Descriptions.Item label="작성자">
                    {info?.author_nickname}
                </Descriptions.Item>

                <Descriptions.Item label="공개 여부">
                    {info?.visibility}
                </Descriptions.Item>

                <Descriptions.Item label="카테고리">
                    {info?.category}
                </Descriptions.Item>

                <Descriptions.Item label="사용된 횟수">
                    {info?.usages}
                </Descriptions.Item>

                <Descriptions.Item label="즐겨찾기 수">
                    {info?.star}
                </Descriptions.Item>

                <Descriptions.Item label="프롬프트">
                    {info?.prompt_template}
                </Descriptions.Item>
            </Descriptions>
        </Drawer>
    );
}
