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
					colorPrimary: '#7580EA', //#4A7DFF
					fontFamily: 'Suit',
				},
				components: {
					Select: {
						optionSelectedColor: '#7580EA',
						optionSelectedBg: '#F2F3FD',
					},
				},
			}}
		>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ConfigProvider>
	);
};

export default Styles;
