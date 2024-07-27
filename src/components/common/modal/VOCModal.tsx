import { Button, Form, Modal, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import styled from "styled-components";

type FormTypes = {
    rate: number;
    content: string;
};

export interface VOCModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

export default function VOCModal({ isOpen, closeModal }: VOCModalProps) {
    function handleOnFinish(values: FormTypes) {
        console.log(values);
    }

    return (
        <Modal
            title="피드백"
            open={isOpen}
            onClose={closeModal}
            onCancel={closeModal}
        >
            <Form name="voc" onFinish={handleOnFinish} layout="vertical">
                <Form.Item name="rate" initialValue={0}>
                    <Rate style={flexCenter} />
                </Form.Item>

                <FeedBackDescription>
                    추가되었으면 하는 기능이나 불편한 점이 있다면 자유롭게
                    말해주세요!
                </FeedBackDescription>

                <Form.Item
                    name="content"
                    hasFeedback
                    rules={[{ required: true }]}
                >
                    <TextArea placeholder="여기에 의견을 작성해주세요" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%" }}
                    >
                        제출하기
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

const FeedBackDescription = styled.div`
    ${({ theme }) => theme.fonts.modal};
    color: ${({ theme }) => theme.colors.deep_gray};
    margin-bottom: 10px;
`;

const flexCenter = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};
