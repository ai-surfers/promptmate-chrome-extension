import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import TemplatePage from "./pages/template/TemplatePage";
import PromptPage from "./pages/prompt/PromptPage";

const router = createMemoryRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <LoginPage />,
            },
            {
                path: "/home",
                element: <HomePage />,
            },
            {
                path: "/template",
                element: <TemplatePage />,
            },
            {
                path: "/prompt",
                element: <PromptPage />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
