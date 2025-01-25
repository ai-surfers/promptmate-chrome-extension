import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { ConfigProvider } from 'antd';

interface StylesProps {
	children: React.ReactNode;
}

const Styles = ({ children }: StylesProps) => {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#001529', //#4A7DFF
					fontFamily: 'Suit',
				},
			}}
		>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ConfigProvider>
	);
};

export default Styles;
