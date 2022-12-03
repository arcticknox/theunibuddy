import './PasswordReset.scss';
import * as React from 'react';
import {
  Container, Paper, TextField, Button, FormControl,
  OutlinedInput, InputAdornment, IconButton, InputLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import fetchAPI from '../../utils/fetchAPI';

import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';

function PasswordReset() {
  const [otpError, setOtpError] = useState(false);
  const [otpHelperText, setOtpHelperText] = useState('');
  const [passwordResetComplete, setpasswordResetComplete] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [emailError, setEmailError] = useState({ error: false, tick: false });
  const [email, setEmail] = useState('');
  const [inputOTP, setInputOTP] = useState(false);
  const [values, setValues] = useState({
    otp: '',
    password: '',
    showPassword: false,
  });
  const navigate = useNavigate();

  const requestPasswordResetAPI = async () => {
    const body = {
      email,
    };
    const response = await fetchAPI('http://localhost:8080/auth/password-reset', 'post', body);
    if (response.success) {
      setEmailDisabled(true);
      setInputOTP(true);
      setEmailError({ error: false, tick: true });
      setHelperText('');
    } else {
      setEmailError({ error: true, tick: false });
      setHelperText('Account Not Registered');
    }
  };

  const verifyOtpAndResetPassword = async () => {
    const body = {
      email,
      otp: values.otp,
      newPassword: values.password,
    };
    const response = await fetchAPI('http://localhost:8080/auth/verify-password-reset', 'put', body);
    if (response.success) {
      setOtpError(false);
      setOtpHelperText('');
      setpasswordResetComplete(true);
    } else {
      setOtpError(true);
      setOtpHelperText('Invalid OTP OR OTP expired');
    }
  };

  const handleChange =
  (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Container maxWidth="md" className='password-reset-container'>
      <Paper elevation={24} textAlign='center' className='passreset-main-paper'>
        {!passwordResetComplete ? <div>
          <div>
            <h2>Password Reset</h2>
          </div>
          <div>
            <h3>Enter Registered Email For Verification</h3>
          </div>
          <div>
            <TextField
              error={emailError.error}
              helperText={helperText}
              required
              label="Email"
              id="verify-login-email-textfield"
              sx={{ m: 1, width: '25ch' }}
              value={email}
              onChange={handleEmailChange}
              disabled={emailDisabled}
            />
            {emailError.tick &&
          <CheckIcon className="check-icon"
            fontSize='large'
            color='success'/>}
          </div>
          <div>
          </div>
          <div>
            <Button
              disabled={emailDisabled}
              onClick={async () => {
                await requestPasswordResetAPI();
              }} className='verify-button' variant="outlined">
        Verify
            </Button>
          </div>
          {inputOTP && <div>
            <div>
              <h3>Enter OTP Sent To Your Email</h3>
            </div>
            <TextField
              error={otpError}
              helperText={otpHelperText}
              label="OTP"
              id="otp-textfield"
              sx={{ m: 1, width: '25ch' }}
              value={values.otp}
              onChange={handleChange('otp')}
            />
            <div>
              <h3>Enter New Password</h3>
            </div>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <div>
              <Button onClick={async () => {
                await verifyOtpAndResetPassword();
              }} className='login-button' variant="outlined">
            Submit
              </Button>
            </div>
          </div>}
        </div> : <div>
          <div>
            <h2>Password Reset Successful</h2>
          </div>
          <div>
            <Button onClick={() => {
              navigate('/login');
            }} className='login-button' variant="outlined">
            Click To Login
            </Button>
          </div>
        </div>}
      </Paper>
    </Container>
  );
}

export default PasswordReset;
