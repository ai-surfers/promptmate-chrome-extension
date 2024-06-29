import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

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
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
