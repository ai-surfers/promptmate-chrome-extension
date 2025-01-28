import { useToast } from '@/hooks/use-toast';
import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProgress,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from '@/components/ui/toast';
import { cn } from '@/lib/utils';

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{toasts.map(function ({
				id,
				title,
				description,
				action,
				duration,
				showCloseButton,
				...props
			}) {
				return (
					<Toast key={id} {...props}>
						<div className={cn('grid gap-1 group', props.variant)}>
							{title && <ToastTitle>{title}</ToastTitle>}
							{description && <ToastDescription>{description}</ToastDescription>}
						</div>
						{action}

						{showCloseButton && <ToastClose />}
						{duration && <ToastProgress duration={duration} toastId={id} />}
					</Toast>
				);
			})}
			<ToastViewport />
		</ToastProvider>
	);
}
