import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import passport from 'passport';
import jwtStrategy from './utils/jwtStrategy.js';
import errorHandlerMiddleware from './middlewares/error.middlware.js';

const app = express();

app.use(cors());
app.use(express.json()); // Parse json
app.use(express.urlencoded({ extended: true }));
// JWT auth strategy
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
routes(app);
app.use(errorHandlerMiddleware);

export default app;
