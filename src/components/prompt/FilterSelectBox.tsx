import { Select } from "antd";
import { Categories } from "../../core/Prompt";

const CategoriesOptions = Object.entries(Categories);

interface FilterSelectBoxProps {
    // onChange: (values: string[]) => void;
    onChange: (values: string | undefined) => void;
}
export default function FilterSelectBox({ onChange }: FilterSelectBoxProps) {
    // const [filters, setFilters] = useState<string[]>([]);

    // const handleSelect = (value: string) => {
    //     const updatedFilters = [...filters, value];
    //     setFilters(updatedFilters);
    //     onChange(updatedFilters);
    // };

    // const handleDeselect = (value: string) => {
    //     const updatedFilters = filters.filter((filter) => filter !== value);
    //     setFilters(updatedFilters);
    //     onChange(updatedFilters);
    // };

    // const handleOnClear = () => {
    //     const updatedFilters: string[] = [];
    //     setFilters(updatedFilters);
    //     onChange(updatedFilters);
    // };

    return (
        <Select
            style={{ minWidth: "100px" }}
            allowClear
            placeholder="필터"
            onSelect={(value) => onChange(value)}
            onClear={() => onChange(undefined)}
        >
            {CategoriesOptions.map(([key, value]) => (
                <Select.Option key={value.en} value={key}>
                    {value.ko}
                </Select.Option>
            ))}
        </Select>
    );
}
