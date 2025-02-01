import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const chipVariants = cva('inline-flex items-center justify-center rounded-md transition-colors', {
	variants: {
		variant: {
			fill: 'border-transparent',
			outline: 'bg-opacity-10 border border-current',
			light: 'bg-opacity-10',
		},
		color: {
			gray: 'bg-gray-600 text-white border-gray-600',
			purple: 'bg-primary-100 text-white border-primary-100',
		},
		size: {
			28: 'h-[28px] px-3 min-w-10 b3_14_med rounded-[6px]',
			24: 'h-[24px] px-2.5 min-w-9 c1_12_med rounded-[4px]',
			20: 'h-[20px] px-2 min-w-8 c2_11_reg rounded-[4px]',
		},
	},
	compoundVariants: [
		{
			variant: 'outline',
			color: 'purple',
			className: 'bg-primary-10 border-primary-30 text-primary-100',
		},
		{
			variant: 'outline',
			color: 'gray',
			className: 'bg-gray-100 border-gray-300 text-gray-600',
		},
		{
			variant: 'light',
			color: 'purple',
			className: 'bg-primary-10 text-primary-100',
		},
		{
			variant: 'light',
			color: 'gray',
			className: 'bg-gray-100 text-gray-600',
		},
	],
	defaultVariants: {
		variant: 'fill',
		color: 'purple',
		size: 28,
	},
});

const Chip = React.forwardRef<
	React.ElementRef<'button'>,
	React.ComponentPropsWithoutRef<'button'> & VariantProps<typeof chipVariants>
>(({ className, variant, color, size, ...props }, ref) => (
	<button ref={ref} className={cn(chipVariants({ variant, color, size, className }))} {...props} />
));

Chip.displayName = 'Chip';
export { Chip, chipVariants };
