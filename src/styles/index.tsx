import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import theme from "./theme";

interface StylesProps {
    children: React.ReactNode;
}

const Styles = ({ children }: StylesProps) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    );
};

export default Styles;
