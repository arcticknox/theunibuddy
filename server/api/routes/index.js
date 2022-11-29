import AuthRoute from './auth.route.js';
import AdminRoute from './admin.route.js';
import UserRoute from './user.route.js';
import RoomRoute from './room.route.js';
import ProjectRoute from './project.route.js';

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
  {
    path: '/room',
    route: RoomRoute,
  },
  {
    path: '/project-group',
    route: ProjectRoute,
  },
];

export default (app) => {
  appRoutes.forEach((route) => {
    app.use(route.path, route.route);
  });
};
