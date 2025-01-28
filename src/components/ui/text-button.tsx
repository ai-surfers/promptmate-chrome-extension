import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const textButtonVariants = cva(
	[
		'inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors box-border',
		'disabled:bg-gray-100 disabled:text-gray-300 disabled:hover:shadow-none',
	],
	{
		variants: {
			variant: {
				primary: 'text-primary-100 hover:bg-primary-10',
				normal: 'text-gray-600 hover:bg-gray-100',
				underline: 'text-gray-600 underline hover:bg-gray-100',
			},
			size: {
				56: 'b1_18_semi h-[56px] px-4 py-2 rounded-[12px]',
				52: 'b2_16_semi h-[52px] px-4 py-2 rounded-[12px]',
				44: 'b2_16_semi h-[44px] px-4 py-2 rounded-[8px]',
				36: 'b3_14_semi h-[36px] px-3 py-2 rounded-[8px]',
				32: 'b3_14_semi h-[32px] px-3 py-2 rounded-[8px]',
				26: 'b1_12_semi h-[26px] px-2 py-2 rounded-[6px]',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 56,
		},
	}
);

export interface TextButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof textButtonVariants> {
	asChild?: boolean;
}

const TextButton = React.forwardRef<HTMLButtonElement, TextButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp className={cn(textButtonVariants({ variant, size, className }))} ref={ref} {...props} />
		);
	}
);
TextButton.displayName = 'Button';

export { TextButton, textButtonVariants };
