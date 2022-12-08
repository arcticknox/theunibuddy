import './SignUp.scss';
import * as React from 'react';
import { Container, Paper, TextField, Button, FormControl,
  OutlinedInput, InputAdornment, IconButton, InputLabel,
} from '@mui/material';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { Link } from 'react-router-dom';
import fetchAPI from '../../utils/fetchAPI';

import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useState } from 'react';

// Signup component
function SignUp() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    showPassword: false,
    hasRegistered: false,
  });

  // Sign up user api call
  const signUpUserAPI = async () => {
    const body = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    const response = await fetchAPI('http://localhost:8080/auth/register', 'post', body);
    if (response.success) setValues({ hasRegistered: true });
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
    <Container maxWidth="md" className='signup-container'>
      <Paper elevation={24} textAlign='center' className='signup-main-paper'>
        {!values.hasRegistered ?
            <div>
              <div>
                <h2>Sign Up</h2>
              </div>
              <div>
                <TextField
                  label="Name"
                  id="signup-name-textfield"
                  sx={{ m: 1, width: '25ch' }}
                  value={values.name}
                  onChange={handleChange('name')}
                />
              </div>
              <div>
                <TextField
                  label="Email"
                  id="signup-email-textfield"
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
                          {values.showPassword ?
                            <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </div>
              <div>
                <p><Link to='/login'>Already have an account?</Link></p>
              </div>
              <div>
                <Button onClick={async () => {
                  await signUpUserAPI();
                }} className='signup-button' variant="outlined">Sign Up</Button>
              </div>
            </div> :
            <div>
              <div>
                <h2>Please verify your email</h2>
              </div>
              <ForwardToInboxIcon fontSize='large'/>
              <p>
                You&apos;re almost there!
                We sent an email to the email provided.
              </p>
              <p>Just click on the link in that email
                to complete your signup.
              </p>
            </div>
        }

      </Paper>
    </Container>
  );
}

export default SignUp;
