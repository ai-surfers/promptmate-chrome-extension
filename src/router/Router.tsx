import { createMemoryRouter } from "react-router-dom";
import HeaderLayout from "../layouts/HeaderLayout";
import LoginPage from "../pages/login/LoginPage";
import HomePage from "../pages/home/HomePage";
import Layout from "../layouts/Layout";
import PromptPage from "../pages/prompt/PromptPage";
import NewPromptPage from "../pages/newPrompt/NewPromptPage";
// import TutorialPromptPage from "../pages/tutorial/TutorialPromptPage";

const router = createMemoryRouter([
    {
        path: "/",
        element: <HeaderLayout />,
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
        element: <Layout />,
        children: [
            {
                path: "/new-prompt",
                element: <NewPromptPage />,
            },
            {
                path: "/prompt/:id",
                element: <PromptPage />,
            },
            // {
            //     path: "/prompt/tutorial",
            //     element: <TutorialPromptPage />,
            // },
        ],
    },
]);

export default router;
