import { Select } from "antd";

interface ASelectBoxProps {
    options: readonly string[];
    onChange: (value: string[]) => void;
}

export default function ASelectBox({ options, onChange }: ASelectBoxProps) {
    return (
        <Select onChange={onChange} mode="tags" allowClear>
            {options.map((cat) => (
                <Select.Option key={cat} value={cat}>
                    {cat}
                </Select.Option>
            ))}
        </Select>
    );
}
