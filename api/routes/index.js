import AuthRoute from './auth.route.js';

const appRoutes = [
	{
		path: '/auth',
		route: AuthRoute,
	},
];

export default (app) => {
	appRoutes.forEach((route) => {
		app.use(route.path, route.route);
	});
};
