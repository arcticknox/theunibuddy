import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import UserModel from '../models/user.model.js';
import config from '../../config/index.js';

const jwtOptions = {
  secretOrKey: config.jwt.publicKey,
  algorithm: [config.jwt.algorithm],
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== 'access') {
      throw new Error('Invalid token type');
    }
    const user = await UserModel.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;
