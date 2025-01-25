import { createBrowserRouter, createMemoryRouter } from 'react-router-dom';
import HeaderLayout from '../layouts/HeaderLayout';
import LoginPage from '../pages/login/LoginPage';
import HomePage from '../pages/home/HomePage';
import Layout from '../layouts/Layout';
import PromptPage from '../pages/prompt/PromptPage';
import NewPromptPage from '../pages/newPrompt/NewPromptPage';
import ModifyPromptPage from '../pages/modifyPrompt/ModifyPromptPage';
import TutorialPage from '../pages/tutorial/TutorialPage';
// import TutorialPromptPage from "../pages/tutorial/TutorialPromptPage";

const routes = [
	{
		path: '/',
		element: <LoginPage />,
	},
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/home',
				element: <HomePage />,
			},
			{
				path: '/new-prompt',
				element: <NewPromptPage />,
			},
			{
				path: '/prompt/:id',
				element: <PromptPage />,
			},
			{
				path: '/prompt/:id/modify',
				element: <ModifyPromptPage />,
			},
			{
				path: '/tutorial',
				element: <TutorialPage />,
			},
		],
	},
	{
		path: '/*',
		element: <LoginPage />,
	},
];

const createRouter =
	import.meta.env.NODE_ENV === 'production'
		? () => createMemoryRouter(routes, {})
		: () => createBrowserRouter(routes);

const router = createRouter();

export default router;
