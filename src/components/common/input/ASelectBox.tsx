import { Select } from "antd";
import { Option } from "antd/es/mentions";

interface ASelectBoxProps {
    value: string | undefined;
    options: readonly string[];
    onChange: (value: string) => void;
}

export default function ASelectBox({
    value,
    options,
    onChange,
}: ASelectBoxProps) {
    return (
        <Select value={value} onChange={onChange}>
            {options.map((cat) => (
                <Select.Option key={cat} value={cat}>
                    {cat}
                </Select.Option>
            ))}
        </Select>
    );
}
