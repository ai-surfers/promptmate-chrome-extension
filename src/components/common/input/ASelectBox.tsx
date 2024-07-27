import { Select } from "antd";

interface ASelectBoxProps {
    options: readonly string[];
    mode?: "multiple" | "tags" | undefined;
    onChange?: (value: string[]) => void;
}

export default function ASelectBox({
    options,
    mode,
    onChange,
}: ASelectBoxProps) {
    return (
        <Select onChange={onChange} mode={mode} allowClear>
            {options.map((cat) => (
                <Select.Option key={cat} value={cat}>
                    {cat}
                </Select.Option>
            ))}
        </Select>
    );
}
