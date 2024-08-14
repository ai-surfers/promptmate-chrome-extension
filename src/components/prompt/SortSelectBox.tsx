import { Select } from "antd";
import { SortBy } from "../../core/Prompt";

const SortByOptions = Object.entries(SortBy);

interface SortByBoxProps {
    onSelect: (value: string) => void;
}
export default function SortSelectBox({ onSelect }: SortByBoxProps) {
    return (
        <Select onSelect={onSelect} defaultValue={SortByOptions[0]}>
            {SortByOptions.map(([key, value]) => (
                <Select.Option key={value} value={key}>
                    {value}
                </Select.Option>
            ))}
        </Select>
    );
}
