import './Login.scss';
import * as React from 'react';
import { Container, Paper, TextField, Button, FormControl,
  OutlinedInput, InputAdornment, IconButton, InputLabel,
} from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import fetchAPI from '../../utils/fetchAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthInfo, setIsLoggedIn } from '../../redux/slices/authSlice';

import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useState } from 'react';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const userInfo = useSelector((state) => state.auth.userInfo);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log('UserInfo', userInfo, accessToken);
  const dispatch = useDispatch();

  const loginUserAPI = async () => {
    const body = {
      email: values.email,
      password: values.password,
    };
    const response = await fetchAPI('http://localhost:8080/auth/login', 'post', body);
    dispatch(setAuthInfo(response));
    dispatch(setIsLoggedIn());
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

  return (
    <Container maxWidth="md" className='login-container'>
      {isLoggedIn && (<Navigate to='/' />)}
      <Paper elevation={24} textAlign='center' className='login-main-paper'>
        <div>
          <h2>Login</h2>
        </div>
        <div>
          <TextField
            label="Email"
            id="login-email-textfield"
            sx={{ m: 1, width: '25ch' }}
            value={values.email}
            onChange={handleChange('email')}
          />
        </div>
        <div>
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
        </div>
        <div>
          <p><a href='#'>Forgot password?</a></p>
        </div>
        <div>
          <Button onClick={async () => {
            await loginUserAPI();
          }} className='login-button' variant="outlined">
                    Login
          </Button>
          <Link style={{ textDecoration: 'none' }} to='/signup'>
            <Button className='signup-button' variant="outlined">
                Sign Up
            </Button></Link>
        </div>

      </Paper>
    </Container>
  );
}

export default Login;
