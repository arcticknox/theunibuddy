import AuthRoute from './auth.route.js';
import AdminRoute from './admin.route.js';

const appRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/admin',
    route: AdminRoute,
  },
];

export default (app) => {
  appRoutes.forEach((route) => {
    app.use(route.path, route.route);
  });
};
