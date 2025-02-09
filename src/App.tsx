import { RouterProvider } from 'react-router-dom';
import router from './router/Router';
import { RecoilRoot } from 'recoil';
import AModal from './components/common/modal/AModal';
import Alert from './components/common/alert/Alert';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './service/queryClient';
import { useEffect } from 'react';
import { initializeGA } from './utils/ga';
import { initializeSentry } from '@/utils/sentry';
import { captureException, ErrorBoundary, FallbackRender } from '@sentry/react';
import { OverlayProvider } from '@toss/use-overlay';
import { Toaster } from './components/ui/toaster';
import { Button } from '@/components/ui/button';

const TRACKING_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

function App() {
	console.log(`🍀 ENVIRONMENT: ${import.meta.env.VITE_MODE}`);

	useEffect(() => {
		TRACKING_ID && initializeGA(TRACKING_ID);
		SENTRY_DSN && initializeSentry(SENTRY_DSN);
	}, []);

	return (
		<ErrorBoundary fallback={ErrorFallback}>
			<OverlayProvider>
				<QueryClientProvider client={queryClient}>
					<RecoilRoot>
						<RouterProvider router={router} />
						<AModal />
						<Alert />
						<Toaster />
					</RecoilRoot>
				</QueryClientProvider>
			</OverlayProvider>
		</ErrorBoundary>
	);
}

const ErrorFallback: FallbackRender = ({ error }) => {
	captureException(error);

	return (
		<div className="m-auto bg-white max-w-[452px] min-w-[344px] w-screen h-screen flex justify-center items-center">
			<div className="flex flex-col gap-6 items-center">
				<div className="flex flex-col gap-1 items-center">
					<h3 className=" b1_18_semi text-gray-700 text-center">오류가 발생했습니다</h3>
					<p className="  b3_14_reg text-gray-400 text-center">잠시 후 다시 시도해 주세요</p>
				</div>

				<Button variant="secondary" size={36} onClick={() => (window.location.href = '/')}>
					돌아가기
				</Button>
			</div>
		</div>
	);
};
export default App;
