import eventSchema from '@/eventSchema';
import { usePostEventTag, AddEventTagRequest } from '@/hooks/mutations/event-tag/usePostEventTag';
import { useUser } from '@/hooks/useUser';
import { useCallback } from 'react';
// import qs from 'query-string';

type EventType = 'click' | 'impression' | 'pageView';
type EventName = keyof typeof eventSchema;

export function useLogger() {
	const { userData } = useUser();
	const { mutateAsync: postEventTag } = usePostEventTag({
		onSuccess: () => {},
		onError: () => {},
	});

	const getPageUrl = useCallback(() => {
		return window.location.pathname;
	}, []);

	const getCommonParams = useCallback(() => {
		return {
			// referrer: document.referrer,
			// pquery: qs.parse(window.location.search),
		};
	}, [userData.user?.email]);

	const track = useCallback(
		async (type: EventType, name: EventName, params: Record<string, any>) => {
			const event_params = {
				description: eventSchema[name],
				...getCommonParams(),
				...params,
			};

			const payload: AddEventTagRequest = {
				user_email: userData.user?.email || '',
				event_type: type,
				event_label: name,
				page_url: getPageUrl(),
				event_params,
			};

			const IS_DEV = import.meta.env.VITE_MODE === 'development';
			if (IS_DEV) {
				console.groupCollapsed(`%c🔊 [Event Tracker]: (${type}) ${name}`, 'color: lime;');
				console.log(payload);
				console.groupEnd();
			}

			try {
				await postEventTag(payload);
			} catch (error) {
				IS_DEV && console.log('Failed to track event:', error);
			}
		},
		[getCommonParams, getPageUrl, postEventTag, userData.user?.email]
	);

	return { track };
}
