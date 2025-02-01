import type { SVGProps } from 'react';
const ArrowUpRight = ({ stroke = '#fff', ...props }: SVGProps<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
		<path
			stroke={stroke}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
			d="M7 17 17 7M7 7h10v10"
		/>
	</svg>
);
export default ArrowUpRight;
