import { Select } from 'antd';
import { Categories } from '../../core/Prompt';

const CategoriesOptions = Object.entries(Categories);

interface FilterSelectBoxProps {
	onChange: (values: string | undefined) => void;
}
export default function FilterSelectBox({ onChange }: FilterSelectBoxProps) {
	return (
		<Select
			style={{ minWidth: '100px' }}
			allowClear
			mode="multiple"
			maxCount={3}
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
