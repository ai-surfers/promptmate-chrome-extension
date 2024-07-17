import { useState } from "react";
import { Button, Form } from "antd";
import { Category, Visibility } from "../../core/Prompt";
import ARadioGroup from "../common/input/ARadioGroup";
import AInput from "../common/input/AInput";
import ATextArea from "../common/input/ATextArea";
import ASelectBox from "../common/input/ASelectBox";
import { useForm } from "antd/es/form/Form";
import { CreatePromptRequest } from "../../service/prompt/prompt.model";

interface PromptFormProps {
    onSubmit: (promptData: CreatePromptRequest) => void;
}

export default function PromptForm({ onSubmit }: PromptFormProps) {
    const [form] = useForm();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(Category[0]);
    const [visibility, setVisibility] = useState(Visibility[0]);
    const [prompt, setPrompt] = useState("");

    const handleOnFinish = () => {
        const promptData: CreatePromptRequest = {
            title: title,
            description: description,
            visibility: visibility,
            category: category,
            prompt_template: prompt,
        };

        onSubmit(promptData);
    };

    return (
        <Form
            layout="vertical"
            requiredMark="optional"
            form={form}
            onFinish={handleOnFinish}
        >
            <Form.Item name="제목" label="제목" rules={[{ required: true }]}>
                <AInput
                    value={title}
                    placeholder="마케팅 카피라이트 만들기"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Item>

            <Form.Item name="설명" label="설명" rules={[{ required: true }]}>
                <AInput
                    value={description}
                    placeholder="마케팅 카피라이팅을 만드는 프롬프트"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Form.Item>

            <Form.Item
                name="공개 범위"
                label="공개 범위"
                rules={[{ required: true }]}
            >
                <ARadioGroup
                    value={visibility}
                    options={Visibility}
                    onChange={(vis) => setVisibility(vis.target.value)}
                />
            </Form.Item>

            <Form.Item name="분야" label="분야" rules={[{ required: true }]}>
                <ASelectBox
                    value={category}
                    options={Category}
                    onChange={(cat) => setCategory(cat)}
                />
            </Form.Item>

            <Form.Item
                name="프롬프트"
                label="프롬프트"
                rules={[{ required: true }]}
            >
                <ATextArea
                    value={prompt}
                    placeholder="너는 마케팅 전문가야. $상품 이름$에 대한 마케팅 카피라이팅을 만들어줘. 예상 청중은 $예상 청중$이고 상품의 특징은 $상품 특징$.

이들의 마음을 사로잡을 수 있는 매력적이고 센스있는 카피라이팅을 각기 다른 컨셉으로 총 3개 만들어줘"
                    onChange={(e) => setPrompt(e.target.value)}
                />
            </Form.Item>

            <Button
                type="primary"
                style={{ width: "100%", marginBottom: "50px" }}
                htmlType="submit"
            >
                추가
            </Button>
        </Form>
    );
}
