import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'animate-pulse rounded-md bg-neutral-200',
				'w-fit h-fit [&>*]:invisible',
				className
			)}
			{...props}
		/>
	);
}

export { Skeleton };
