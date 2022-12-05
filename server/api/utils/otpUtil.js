import { totp } from 'otplib';
import config from '../../config/index.js';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

totp.options = {
  digits: config.otp.digits,
  algorithm: config.otp.algorithm,
  step: config.otp.step,
};

const generateOTP = () => {
  const totpSecret = _.replace(`${uuidv4()}${uuidv4()}`, new RegExp(/-/g), '');
  const token = totp.generate(totpSecret);
  return {
    token,
    totpSecret,
  };
};

const verifyOTP = (token, totpSecret) => {
  return totp.check(token, totpSecret);
};

export default {
  generateOTP,
  verifyOTP,
};
