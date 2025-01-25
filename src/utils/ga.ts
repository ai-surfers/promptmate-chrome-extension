// src/utils/ga.ts

/**
 * GA4 스크립트 로드 및 초기화
 * @param TRACKING_ID
 */
export function initializeGA(TRACKING_ID: string) {
	console.log('* Google Analytics Initialized! ', TRACKING_ID);
	const script = document.createElement('script');
	script.src = '/scripts/gtag.js';
	script.async = true;
	document.body.appendChild(script);

	script.onload = () => {
		(window as any).dataLayer = (window as any).dataLayer || [];
		function gtag(...args: any[]) {
			(window as any).dataLayer.push(args);
		}
		(window as any).gtag = gtag;

		gtag('js', new Date());
		gtag('config', TRACKING_ID);
	};
}

/**
 * 이벤트 전송 함수
 * @param eventName
 * @param params
 */
export function sendGAEvent(eventName: string, params: Record<string, any> = {}) {
	if ((window as any).gtag) {
		console.log('[sendGAEvent] ', eventName, params);
		(window as any).gtag('event', eventName, params);
	} else {
		console.log('GA is not initialized yet.');
	}
}
