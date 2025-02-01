import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
	const [indicatorStyle, setIndicatorStyle] = React.useState({
		left: 20,
		width: 35,
	});
	const tabsListRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		const updateIndicator = () => {
			if (tabsListRef.current) {
				const activeTab = tabsListRef.current.querySelector<HTMLElement>('[data-state="active"]');
				if (activeTab) {
					const activeRect = activeTab.getBoundingClientRect();
					const tabsRect = tabsListRef.current.getBoundingClientRect();
					setIndicatorStyle({
						left: activeRect.left - tabsRect.left,
						width: activeRect.width,
					});
				}
			}
		};

		updateIndicator();

		const observer = new MutationObserver(updateIndicator);
		if (tabsListRef.current) {
			observer.observe(tabsListRef.current, {
				attributes: true,
				childList: true,
				subtree: true,
			});
		}
		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div className={className} ref={tabsListRef}>
			<TabsPrimitive.List
				ref={ref}
				className={cn(
					'inline-flex items-center justify-centerbg-white px-5 py-2 text-gray-400 gap-8 border-b-gray-100 border-b w-full'
				)}
				{...props}
			/>
			<div
				className="absolute border border-primary-normal transition-all"
				style={indicatorStyle}
			/>
		</div>
	);
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			'px-1 items-center justify-center whitespace-nowrap b2_16_reg ible:ring-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:b2_16_semi data-[state=active]:text-primary-normal',
			className
		)}
		{...props}
	/>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Content ref={ref} className={cn('', className)} {...props} />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
