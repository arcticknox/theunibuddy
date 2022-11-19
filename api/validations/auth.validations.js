import Joi from 'joi';

const register = {
	body: Joi.object().keys({
		email: Joi.string().required().email(),
		password: Joi.string().required(),
		name: Joi.string().required(),
		role: Joi.string().valid('user', 'admin'),
	}),
};

const login = {
	body: Joi.object().keys({
		email: Joi.string().required(),
		password: Joi.string().required(),
	}),
};

const logout = {
	body: Joi.object().keys({
		refreshToken: Joi.string().required(),
	}),
};

const refreshTokens = {
	body: Joi.object().keys({
		refreshToken: Joi.string().required(),
	}),
};

export default {
	register,
	login,
	logout,
	refreshTokens,
};
