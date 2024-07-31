import { useMemo } from "react";
import { Button, Form, Input, Radio, Select } from "antd";
import { Category, InputType, Visibility } from "../../core/Prompt";

import { useForm } from "antd/es/form/Form";
import { extractOptions } from "../../utils";
import {
    CreatePromptRequest,
    InputFormat,
} from "../../hooks/mutations/prompt/usePostPrompt";
import InputTags from "./PropertyForm/InputTags";
import TextArea from "antd/es/input/TextArea";

interface PromptFormProps {
    onSubmit: (promptData: CreatePromptRequest) => void;
}

export default function PromptForm({ onSubmit }: PromptFormProps) {
    const [form] = useForm();

    const prompt = Form.useWatch("prompt_template", form);
    const inputs = useMemo(() => {
        return extractOptions(prompt);
    }, [prompt]);

    const handleOnFinish = (values: CreatePromptRequest) => {
        const user_input_formats = inputs.map<InputFormat>((ip) => ({
            name: ip,
            type: InputType.TEXT,
            placeholder: "",
        }));

        const promptData: CreatePromptRequest = {
            ...values,
            user_input_format: user_input_formats,
        };

        console.log(">> promptData", promptData);

        onSubmit(promptData);
    };

    function insert(tag: string) {
        const newPrompt = `${prompt} {{${tag}}}`;
        form.setFieldValue("prompt", newPrompt);
    }

    return (
        <Form
            layout="vertical"
            requiredMark="optional"
            form={form}
            onFinish={handleOnFinish}
        >
            <Form.Item name="title" label="제목" rules={[{ required: true }]}>
                <Input placeholder="마케팅 카피라이트 만들기" />
            </Form.Item>

            <Form.Item
                name="description"
                label="설명"
                rules={[{ required: true }]}
            >
                <Input placeholder="마케팅 카피라이팅을 만드는 프롬프트" />
            </Form.Item>

            <Form.Item
                name="visibility"
                label="공개 범위"
                rules={[{ required: true }]}
                initialValue={Visibility[0]}
            >
                <Radio.Group>
                    {Visibility.map((opt) => (
                        <Radio.Button value={opt} key={opt}>
                            {opt}
                        </Radio.Button>
                    ))}
                </Radio.Group>
            </Form.Item>

            <Form.Item
                name="categories"
                label="분야"
                rules={[{ required: true }]}
            >
                <Select
                    placeholder="분야를 선택해주세요"
                    allowClear
                    mode="multiple"
                >
                    {Category.map((cat) => (
                        <Select.Option key={cat} value={cat}>
                            {cat}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="prompt_template"
                label="프롬프트"
                rules={[{ required: true }]}
                initialValue={""}
            >
                <TextArea
                    style={{ minHeight: "100px" }}
                    placeholder="너는 마케팅 전문가야. $상품 이름$에 대한 마케팅 카피라이팅을 만들어줘. 예상 청중은 $예상 청중$이고 상품의 특징은 $상품 특징$.

이들의 마음을 사로잡을 수 있는 매력적이고 센스있는 카피라이팅을 각기 다른 컨셉으로 총 3개 만들어줘"
                />
            </Form.Item>

            <InputTags tags={inputs} onInsert={insert} />

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
