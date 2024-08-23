import { Button, Form, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import styled from "styled-components";
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
    const [form] = Form.useForm();

    const { mutate } = usePostFeedback({
        onSuccess: (res) => {
            const { success, detail } = res;
            console.log(`>> `, success, detail);

            handleCloseModal();
        },
        onError: (error) => {
            console.error(error.message);
            closeModal();
            handleCloseModal();
        },
    });

    function handleOnFinish(values: FormTypes) {
        mutate(values);
    }

    function handleCloseModal() {
        closeModal();
        form.resetFields();
    }

    return (
        <Modal
            title="피드백"
            open={isOpen}
            onClose={handleCloseModal}
            onCancel={handleCloseModal}
            footer={<></>}
        >
            <Form
                form={form}
                name="voc"
                onFinish={handleOnFinish}
                layout="vertical"
            >
                <FeedBackDescription>
                    추가되었으면 하는 기능이나 불편한 점이 있다면 자유롭게
                    말해주세요!
                    <br />
                    여러분들의 소중한 의견을 듣고 적극 반영하겠습니다 :)
                </FeedBackDescription>

                {/* <Form.Item name="category" rules={[{ required: true }]}>
                    <ASelectBox options={FeedBackCategories} />
                </Form.Item> */}

                <Form.Item
                    name="content"
                    hasFeedback
                    rules={[{ required: true }]}
                >
                    <TextArea
                        placeholder="여기에 의견을 작성해주세요"
                        style={{ minHeight: "80px" }}
                    />
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
    margin: 20px 0 10px;
`;
