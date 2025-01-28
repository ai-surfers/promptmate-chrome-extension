import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Progress } from './progress';
import { useToast } from '@/hooks/use-toast';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Viewport>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Viewport
		ref={ref}
		className={cn(
			'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
			className
		)}
		{...props}
	/>
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
	'group pointer-events-auto relative flex flex-col w-full items-start justify-between gap-2.5 pr-4 overflow-hidden rounded-[12px] px-5 py-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full dark:border-neutral-800',
	{
		variants: {
			variant: {
				light: 'light group bg-white text-gray-800',
				dark: 'dark group bg-gray-900 text-gray-white',
			},
		},
		defaultVariants: {
			variant: 'light',
		},
	}
);

const Toast = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
	return (
		<ToastPrimitives.Root
			ref={ref}
			className={cn(toastVariants({ variant }), className)}
			{...props}
		/>
	);
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Action>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Action
		ref={ref}
		className={cn(
			'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
			className
		)}
		{...props}
	/>
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Close>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Close
		ref={ref}
		className={cn(
			'absolute right-4 top-0 bottom-0 opacity-0 hover:opacity-100 transition-opacity',
			'group-[.dark]:text-white',
			className
		)}
		toast-close=""
		{...props}
	>
		<X className="h-6 w-6" />
	</ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Title>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Title
		ref={ref}
		className={cn(
			'h2_20_semi',
			'group-[.light]:text-gray-900',
			'group-[.dark]:text-white',
			className
		)}
		{...props}
	/>
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
	React.ElementRef<typeof ToastPrimitives.Description>,
	React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
	<ToastPrimitives.Description
		ref={ref}
		className={cn(
			'b3_14_reg',
			'group-[.light]:text-gray-400',
			'group-[.dark]:text-gray-300',
			className
		)}
		{...props}
	/>
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

const ToastProgress = React.forwardRef<
	React.ElementRef<typeof Progress>,
	React.ComponentPropsWithoutRef<typeof Progress> & { duration: number; toastId: string }
>(({ className, duration, toastId, ...props }, ref) => {
	const { dismiss } = useToast();
	const [progress, setProgress] = React.useState(0);

	React.useEffect(() => {
		const startTime = performance.now();

		const updateProgress = (currentTime: number) => {
			const elapsed = currentTime - startTime;
			const newProgress = Math.min((elapsed / duration) * 100, 100);
			setProgress(newProgress);

			if (newProgress < 100) {
				requestAnimationFrame(updateProgress);
			}
		};

		requestAnimationFrame(updateProgress);

		return () => setProgress(0);
	}, [duration]);

	React.useEffect(() => {
		if (progress >= 100) {
			setTimeout(() => {
				dismiss(toastId);
			}, 300);
		}
	}, [progress]);

	return <Progress ref={ref} value={progress} className={cn('h-1', className)} {...props} />;
});
ToastProgress.displayName = 'ToastProgress';

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
	type ToastProps,
	type ToastActionElement,
	ToastProvider,
	ToastViewport,
	Toast,
	ToastTitle,
	ToastDescription,
	ToastClose,
	ToastAction,
	ToastProgress,
};
