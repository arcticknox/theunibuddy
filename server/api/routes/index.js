import AuthRoute from './auth.route.js';
import AdminRoute from './admin.route.js';
import UserRoute from './user.route.js';

const appRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/admin',
    route: AdminRoute,
  },
  {
    path: '/user',
    route: UserRoute,
  },
];

export default (app) => {
  appRoutes.forEach((route) => {
    app.use(route.path, route.route);
  });
};
