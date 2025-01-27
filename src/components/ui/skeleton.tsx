import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'animate-pulse rounded-md bg-gray-100',
				'w-fit h-fit [&>*]:invisible',
				className
			)}
			{...props}
		/>
	);
}

export { Skeleton };
