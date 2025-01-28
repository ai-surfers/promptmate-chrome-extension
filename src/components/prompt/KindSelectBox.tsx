import ImageBlock from '@/assets/ImageBlock';
import TextBlock from '@/assets/TextBlock';
import { useToast } from '@/hooks/use-toast';
import { cloneElement, ReactElement, ReactNode, useMemo } from 'react';

type Props = {
	kind: 'text' | 'image';
	onChange: (kind: 'text' | 'image') => void;
};

const Type: { type: 'text' | 'image'; icon: ReactElement }[] = [
	{ type: 'text', icon: <TextBlock /> },
	{ type: 'image', icon: <ImageBlock /> },
];
const KindSelectBox = ({ kind, onChange }: Props) => {
	const { toast } = useToast();
	function handleOnChange(kind: 'text' | 'image') {
		if (kind === 'image') {
			toast({
				description: '이미지 프롬프트는 현재 준비 중인 기능이에요',
				variant: 'dark',
				duration: 1000,
			});
			return;
		}

		onChange(kind);
	}

	return (
		<div className="flex gap-5">
			{Type.map((item, index) => (
				<button key={index} onClick={() => handleOnChange(item.type)}>
					{cloneElement(item.icon, item.type === kind ? { type: 'fill', color: '#7580EA' } : {})}
				</button>
			))}
		</div>
	);
};

export default KindSelectBox;
