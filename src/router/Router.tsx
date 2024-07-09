import { createMemoryRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import LoginPage from "../pages/login/LoginPage";
import HomePage from "../pages/home/HomePage";
import PromptPage from "../pages/prompt/PromptPage";
import PromptLayout from "../layouts/PromptLayout";

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
        ],
    },
    {
        path: "/",
        element: <PromptLayout />,
        children: [
            {
                path: "/prompt",
                element: <PromptPage />,
            },
        ],
    },
]);

export default router;
