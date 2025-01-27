import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';

export default function Layout() {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<Container>
			<Outlet />
		</Container>
	);
}

const Container = styled.div`
    max-width: 452px;
    margin: 0 auto;

    background: #fff;

	width: 100%;
	height: 100vh;

    position: relative;
`;

export const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 60px);
    background: #fff;

    padding: 20px 40px;
`;
