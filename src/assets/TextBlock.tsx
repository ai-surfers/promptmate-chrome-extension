import type { SVGProps } from 'react';

type Props = {
	color?: string;
	type?: 'line' | 'fill';
} & SVGProps<SVGSVGElement>;
const TextBlock = ({
	width = 24,
	height = 24,
	color = '#818491',
	type = 'line',
	...props
}: Props) => {
	if (type === 'fill') {
		return (
			<svg
				width={width}
				height={height}
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				{...props}
			>
				<path
					fill={color}
					stroke={color}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.5}
					d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7"
				/>
				<path
					stroke="#fff"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.5}
					d="M7 8.89c3.15-1.57 6.85-1.57 10 0M12 16.3V7.93"
				/>
			</svg>
		);
	}

	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
				d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7"
			/>
			<path
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
				d="M7 8.89c3.15-1.57 6.85-1.57 10 0M12 16.3V7.93"
			/>
		</svg>
	);
};
export default TextBlock;
