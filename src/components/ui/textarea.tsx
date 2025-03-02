import * as React from 'react';
import { cn } from '@/lib/utils';
import { mergeRefs } from '@/lib/mergeRefs';

export interface TextareaProps extends React.ComponentProps<'textarea'> {
	count?: number;
	autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, count, autoResize, onChange, ...props }, ref) => {
		const [length, setLength] = React.useState(0);
		const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

		const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const currentValue = e.target.value;
			setLength(currentValue.length);
			if (count && currentValue.length > count) return;
			if (onChange) onChange(e);

			autoResize && adjustHeight();
		};

		const adjustHeight = React.useCallback(() => {
			const textarea = textareaRef.current;
			if (!textarea) return;

			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight}px`;
		}, []);

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
					ref={mergeRefs(ref, textareaRef)}
					className={cn(
						'flex w-full min-h-[28px] h-full border-none bg-transparent outline-none resize-vertical',
						'b3_14_med text-gray-700 placeholder:text-primary-60 placeholder:b3_14_reg focus:outline-none focus:ring-0',
						'disabled:resize-none disabled:text-gray-300 disabled:placeholder-gray-300',
						className
					)}
					onChange={handleChange}
					rows={1}
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
