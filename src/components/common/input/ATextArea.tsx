import { ChangeEvent } from "react";
import TextArea from "antd/es/input/TextArea";

interface ATextAreaProps {
    placeholder?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function ATextArea({
    placeholder,
    value,
    onChange,
}: ATextAreaProps) {
    return (
        <TextArea
            style={{ minHeight: "100px" }}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}
