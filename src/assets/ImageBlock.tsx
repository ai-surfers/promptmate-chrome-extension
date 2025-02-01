import type { SVGProps } from 'react';

type Props = {
	color?: string;
	type?: 'line' | 'fill';
} & SVGProps<SVGSVGElement>;
const ImageBlock = ({
	width = 24,
	height = 24,
	color = '#818491',
	type = 'line',
	...props
}: Props) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			{...(type === 'fill' && { fill: color })}
			{...(type === 'line' && { stroke: color })}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="m21.677 16.96-3.13-7.31c-1.06-2.48-3.01-2.58-4.32-.22l-1.89 3.41c-.96 1.73-2.75 1.88-3.99.33l-.22-.28c-1.29-1.62-3.11-1.42-4.04.43l-1.72 3.45c-1.21 2.4.54 5.23 3.22 5.23h12.76c2.6 0 4.35-2.65 3.33-5.04M6.969 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
		/>
	</svg>
);
export default ImageBlock;
