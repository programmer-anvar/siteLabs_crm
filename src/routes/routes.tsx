import Layout from '@/components/Layout';
import Login from '@/pages/login/Login';
import Oylik from '@/pages/oylik/Oylik';
import Statistika from '@/pages/statistika/Statistika';
import { createBrowserRouter } from 'react-router-dom';

export const protectedRouter = createBrowserRouter([
	{
		path: '/',
		element: (
			<Layout>
				<Oylik />
			</Layout>
		),
	},

	{
		path: '/statistika',
		element: (
			<Layout>
				<Statistika />
			</Layout>
		),
	},
]);

export const publicRouter = createBrowserRouter([
	{ path: '*', element: <Login /> },
]);
