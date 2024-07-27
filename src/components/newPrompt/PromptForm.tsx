import { useEffect, useMemo, useState } from "react";
import { Button, Form } from "antd";
import { Category, InputType, Visibility } from "../../core/Prompt";
import ARadioGroup from "../common/input/ARadioGroup";
import AInput from "../common/input/AInput";
import ATextArea from "../common/input/ATextArea";
import ASelectBox from "../common/input/ASelectBox";
import { useForm } from "antd/es/form/Form";
import { extractOptions } from "../../utils";
import {
    CreatePromptRequest,
    InputFormat,
} from "../../hooks/mutations/prompt/usePostPrompt";
import InputTags from "./PropertyForm/InputTags";

interface PromptFormProps {
    onSubmit: (promptData: CreatePromptRequest) => void;
}

export default function PromptForm({ onSubmit }: PromptFormProps) {
    const [form] = useForm();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<string[]>([]);
    const [visibility, setVisibility] = useState(Visibility[0]);
    const [prompt, setPrompt] = useState("");

    const inputs = useMemo(() => {
        return extractOptions(prompt);
    }, [prompt]);

    useEffect(() => {
        console.log("Prompt updated:", prompt);
    }, [prompt]);

    const handleOnFinish = () => {
        const user_input_formats = inputs.map<InputFormat>((ip) => ({
            name: ip,
            type: InputType.TEXT,
            placeholder: "",
        }));

        const promptData: CreatePromptRequest = {
            title: title,
            description: description,
            visibility: visibility,
            categories: category,
            prompt_template: prompt,
            user_input_format: user_input_formats,
        };

        onSubmit(promptData);
    };

    function insert(tag: string) {
        console.log("tag! ", tag);
        setPrompt((prevPrompt) => {
            const newPrompt = `${prevPrompt} {{${tag}}}`;
            console.log(")", newPrompt); // 최신 상태를 반영하여 로그
            return newPrompt;
        });
    }

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
                    options={Category}
                    onChange={(cat) => setCategory(cat)}
                    mode="tags"
                />
            </Form.Item>

            <Form.Item
                name="프롬프트"
                label="프롬프트"
                rules={[{ required: true }]}
                valuePropName={prompt}
            >
                <ATextArea
                    value={prompt}
                    placeholder="너는 마케팅 전문가야. $상품 이름$에 대한 마케팅 카피라이팅을 만들어줘. 예상 청중은 $예상 청중$이고 상품의 특징은 $상품 특징$.

이들의 마음을 사로잡을 수 있는 매력적이고 센스있는 카피라이팅을 각기 다른 컨셉으로 총 3개 만들어줘"
                    onChange={(e) => setPrompt(e.target.value)}
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
