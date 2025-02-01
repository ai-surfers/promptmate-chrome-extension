import { Radio, RadioChangeEvent } from 'antd';

interface ARadioGroupProps {
	value: string;
	options: string[];
	onChange: (e: RadioChangeEvent) => void;
}

export default function ARadioGroup({ value, options, onChange }: ARadioGroupProps) {
	return (
		<Radio.Group onChange={onChange} value={value} defaultValue={options[0]}>
			{options.map((opt) => (
				<Radio.Button value={opt} key={opt}>
					{opt}
				</Radio.Button>
			))}
		</Radio.Group>
	);
}
