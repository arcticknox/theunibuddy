import nodemailer from 'nodemailer';
import config from '../../config/index.js';

const transport = {
  host: config.email.host,
  port: config.email.port,
  auth: {
    user: config.email.user,
    pass: config.email.password,
  },
};

// Create connection
const transporter = nodemailer.createTransport(transport);
// Verify connection
transporter.verify()
    .then(() => console.info('SMTP Server connected.'))
    .catch(() => console.error('SMTP Server connection failed.'));

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const message = { from: config.email.from, to, subject, text };
  await transporter.sendMail(message);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'UniBuddy - Email Verification';
  const verificationEmailUrl = `${config.email.verifyDomain}/auth/verify-email?token=${token}`;
  const text = `Dear user,
  To verify your email, click on this link: ${verificationEmailUrl}`;
  await sendEmail(to, subject, text);
};

/**
 * OTP email
 * @param {String} to email recepient
 * @param {Number} otp otp to verify authenticity if user claim
 */
const sendOtpEmail = async (to, otp) => {
  const subject = 'UniBuddy - OTP for Password Reset';
  const text = `Dear user,
  To reset your password, please enter the following OTP: ${otp}`;
  await sendEmail(to, subject, text);
};

/**
 * Roommate invite email
 * @param {String} to
 * @param {String} userName
 */
const sendRoomInvitationEmail = async (to, userName) => {
  const subject = 'UniBuddy - Roommate Invite';
  const text = `Dear user,
  ${userName} has sent a request to join your room. Log in to unibuddy.com to accept the request.`;
  await sendEmail(to, subject, text);
};

export {
  sendEmail,
  sendVerificationEmail,
  sendOtpEmail,
  sendRoomInvitationEmail,
};
