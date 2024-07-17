import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import theme from "./theme";
import { ConfigProvider } from "antd";

interface StylesProps {
    children: React.ReactNode;
}

const Styles = ({ children }: StylesProps) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#4A7DFF",
                    fontFamily: "Suit",
                },
            }}
        >
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                {children}
            </ThemeProvider>
        </ConfigProvider>
    );
};

export default Styles;
