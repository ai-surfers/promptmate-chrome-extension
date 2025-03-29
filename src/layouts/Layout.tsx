import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useLogger } from '@/hooks/useLogger';
export default function Layout() {
	const { pathname } = useLocation();
	const { track } = useLogger();

	useEffect(() => {
		window.scrollTo(0, 0);
		track('pageView', 'pageView', {
			pathname,
		});
	}, [pathname]);

	return (
		<Container>
			<Outlet />
		</Container>
	);
}

const Container = styled.div`
    margin: 0 auto;

    background: #fff;

    max-width: 452px;
    min-width: 344px;
    width: 100vw;
    height: 100vh;

    position: relative;
`;

export const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    background: #fff;

    padding: 20px 40px;
`;
