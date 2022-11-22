import AuthService from '../services/auth.service.js';
import TokenService from '../services/token.service.js';
import UserService from '../services/user.service.js';
import responseHandler from '../utils/responseHandler.js';
import catchAsync from '../utils/catchAsync.js';

/**
 * Register new user
 * @param {Object} req
 * @param {Object} res
 */
const register = catchAsync(async (req, res) => {
  const {body} = req;
  const user = await UserService.createUser(body);
  const tokens = await TokenService.generateAuthTokens(user._id);
  responseHandler(res, {user, tokens});
});

const loginWithEmail = catchAsync(async (req, res) => {
  const {
    body: {email, password},
  } = req;
  const user = await AuthService.loginWithEmail(email, password);
  const tokens = await TokenService.generateAuthTokens(user._id);
  responseHandler(res, {user, tokens});
});

const logout = catchAsync(async (req, res) => {
  const {
    body: {refreshToken},
  } = req;
  await AuthService.logout(refreshToken);
  responseHandler(res, 'Successfuly logged out.');
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await AuthService.refreshAuthToken(req.body.refreshToken);
  responseHandler(res, {...tokens});
});

export default {
  register,
  loginWithEmail,
  logout,
  refreshTokens,
};
