import { ChangeEvent } from 'react';
import { Input } from 'antd';

interface AInputProps {
	placeholder?: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AInput({ placeholder, value, onChange }: AInputProps) {
	return <Input placeholder={placeholder} value={value} onChange={onChange} />;
}
