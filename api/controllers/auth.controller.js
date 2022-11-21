import httpStatus from 'http-status';
import AuthService from '../services/auth.service.js';
import TokenService from '../services/token.service.js';
import UserService from '../services/user.service.js';
import responseHandler from '../utils/responseHandler.js';

/**
 * Register new user
 * @param {Object} req
 * @param {Object} res
 */
const register = async (req, res) => {
	const { body } = req;
	const user = await UserService.createUser(body);
	const tokens = await TokenService.generateAuthTokens(user._id);
	responseHandler(res, { user, tokens });
};

const loginWithEmail = async (req, res) => {
	const {
		body: { email, password },
	} = req;
	const user = await AuthService.loginWithEmail(email, password);
	const tokens = await TokenService.generateAuthTokens(user._id);
	responseHandler(res, { user, tokens });
};

const logout = async (req, res) => {
	const {
		body: { refreshToken },
	} = req;
	await AuthService.logout(refreshToken).catch((err) => {
		responseHandler(res, err, httpStatus.BAD_REQUEST);
	});
	responseHandler(res, 'Successfuly logged out.');
};

const refreshTokens = async (req, res) => {
	const tokens = await AuthService.refreshAuthToken(req.body.refreshToken);
	responseHandler(res, { ...tokens });
};

export default {
	register,
	loginWithEmail,
	logout,
	refreshTokens,
};
