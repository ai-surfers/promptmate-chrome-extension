import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.ComponentProps<'textarea'> {
	count?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, count, onChange, ...props }, ref) => {
		const [length, setLength] = React.useState(0);

		const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const currentValue = e.target.value;
			setLength(currentValue.length);
			if (count && currentValue.length > count) return;
			if (onChange) onChange(e);
		};

		return (
			<div
				className={cn(
					'relative flex flex-col gap-1 rounded-[8px] border border-primary-20 p-3 transition-all',
					'min-h-min max-h-[300px]',
					length > 0 ? 'bg-primary-10' : 'bg-white',
					'hover:bg-primary-10 focus-within:bg-primary-10 focus-within:border-primary-60',
					props.disabled && 'bg-gray-100 border-gray-100 pointer-events-none',
					className
				)}
			>
				<textarea
					ref={ref}
					className={cn(
						'flex w-full h-full border-none bg-transparent outline-none resize-vertical',
						'text-gray-800 placeholder-primary-60 focus:outline-none focus:ring-0',
						'disabled:resize-none disabled:text-gray-300 disabled:placeholder-gray-300',
						className
					)}
					onChange={handleChange}
					{...props}
				/>
				{count && (
					<span className="self-end c1_12_reg text-gray-300">
						<b className={cn('c1_12_semi', length > 0 ? 'text-primary' : 'text-gray-300')}>
							{length > 0 ? length : 0}
						</b>
						/{count}
					</span>
				)}
			</div>
		);
	}
);

Textarea.displayName = 'Textarea';

export { Textarea };
