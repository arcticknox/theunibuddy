import express from 'express';
import cors from 'cors';
import passport from 'passport';
import morgan from 'morgan';
import routes from './routes/index.js';
import jwtStrategy from './utils/jwtStrategy.js';
import errorHandlerMiddleware from './middlewares/error.middlware.js';

const app = express();

app.use(cors());
app.use(express.json()); // Parse json
app.use(express.urlencoded({
  extended: true,
}));
// create "middleware"
app.use(morgan('combined'));
// JWT auth strategy
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
app.use(routes);
app.use(errorHandlerMiddleware);

export default app;
