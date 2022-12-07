import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import passport from 'passport';
import morgan from 'morgan';
import routes from './routes/index.js';
import jwtStrategy from './utils/jwtStrategy.js';
import errorHandlerMiddleware from './middlewares/error.middlware.js';
import authMiddleware from './middlewares/auth.middleware.js';
import { sendMessageToClient } from '../socket/connectionStore.js';
import centralErrorHandler from './utils/centralErrorHandler.js';

const app = express();

app.use(cors());
app.use(express.json()); // Parse json
app.use(express.urlencoded({
  extended: true,
}));
// create "middleware"
app.use(morgan('combined'));

// Security middlewares
// Helmet
app.use(helmet());
// hpp
app.use(hpp());
// Mongo sanitize
app.use(mongoSanitize());

// JWT auth strategy
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
app.use(authMiddleware);
app.use(routes);
app.use(errorHandlerMiddleware);

// Centralized error handler
app.use((err, req, res, next) => {
  centralErrorHandler(err, res);
});

app.get('/send', async (req, res) => {
  const id = req.query.id;
  await sendMessageToClient(id, 'message', 'Message Sent');
  res.send({ success: true });
});

export default app;
