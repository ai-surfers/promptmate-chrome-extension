import { Select } from 'antd';
import { Categories } from '../../core/Prompt';

const CategoriesOptions = Object.entries(Categories);

interface FilterSelectBoxProps {
	onChange: (values: string | undefined) => void;
	onClear: () => void;
}
export default function FilterSelectBox({ onChange, onClear }: FilterSelectBoxProps) {
	return (
		<Select
			style={{ minWidth: '100px' }}
			allowClear
			placeholder="필터"
			onSelect={onChange}
			onClear={onClear}
		>
			{CategoriesOptions.map(([key, value]) => (
				<Select.Option key={value.en} value={key}>
					{value.ko}
				</Select.Option>
			))}
		</Select>
	);
}
