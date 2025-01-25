import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors box-border',
	{
		variants: {
			variant: {
				primary:
					'bg-primary-normal text-white hover:shadow-[0px_2px_16px_0px_#7580EA] active:bg-primary-dark',
				secondary: 'bg-white border border-primary-normal text-primary-normal hover:bg-primary-10',
				normal: 'bg-priamry-10 text-primary-normal hover:bg-primary-20',
				disabled: 'bg-gray-100 text-gray-300 pointer-events-none',
			},
			size: {
				56: 'b1-18-semi h-[56px] px-4 py-2 rounded-[12px]',
				52: 'b2-16-semi h-[52px] px-4 py-2 rounded-[12px]',
				44: 'b2-16-semi h-[44px] px-4 py-2 rounded-[8px]',
				36: 'b3-14-semi h-[36px] px-3 py-2 rounded-[8px]',
				32: 'b3-14-semi h-[32px] px-3 py-2 rounded-[8px]',
				26: 'b1-12-semi h-[26px] px-2 py-2 rounded-[6px]',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 56,
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
