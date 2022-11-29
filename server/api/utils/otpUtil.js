import { totp } from 'otplib';
import config from '../../config/index.js';

const secret = config.otp.secret;
totp.options = {
  digits: config.otp.digits,
  algorithm: config.otp.algorithm,
  step: config.otp.step,
};

const generateOTP = () => {
  return totp.generate(secret);
};

const verifyOTP = (token) => {
  return totp.check(token, secret);
};

export default {
  generateOTP,
  verifyOTP,
};
