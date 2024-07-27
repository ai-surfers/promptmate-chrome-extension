import { Button, Form, Modal, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import styled from "styled-components";
import ASelectBox from "../input/ASelectBox";
import { FeedBackCategories } from "../../../core/Etc";
import { usePostFeedback } from "../../../hooks/mutations/feedback/usePostFeedback";

type FormTypes = {
    rating: number;
    category: string;
    content: string;
};

export interface VOCModalProps {
    isOpen: boolean;
    closeModal: () => void;
}

export default function VOCModal({ isOpen, closeModal }: VOCModalProps) {
    const { mutate } = usePostFeedback({
        onSuccess: (res) => {
            const { success, detail } = res;
            console.log(`>> `, success, detail);
            closeModal();
        },
        onError: (error) => {
            console.error(error.message);
            closeModal();
        },
    });

    function handleOnFinish(values: FormTypes) {
        mutate(values);
    }

    return (
        <Modal
            title="피드백"
            open={isOpen}
            onClose={closeModal}
            onCancel={closeModal}
            footer={<></>}
        >
            <Form name="voc" onFinish={handleOnFinish} layout="vertical">
                <Form.Item name="rating" initialValue={0}>
                    <Rate style={flexCenter} />
                </Form.Item>

                <FeedBackDescription>
                    추가되었으면 하는 기능이나 불편한 점이 있다면 자유롭게
                    말해주세요!
                </FeedBackDescription>

                <Form.Item name="category" rules={[{ required: true }]}>
                    <ASelectBox options={FeedBackCategories} />
                </Form.Item>

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
