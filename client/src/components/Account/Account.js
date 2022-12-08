import * as React from 'react';
import './Account.scss';
import { Container, Paper, TextField, Button, FormControl,
  OutlinedInput, InputAdornment, IconButton, InputLabel,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import fetchAPI from '../../utils/fetchAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../redux/slices/authSlice';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useState } from 'react';

// Account component
function Account() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [values, setValues] = useState({
    ...userInfo,
    password: '',
    showPassword: false,
  });
  const [editable, setEditable] = useState(true);
  const dispatch = useDispatch();

  const handleChange =
        (prop) => (event) => {
          setValues({ ...values, [prop]: event.target.value });
        };

  const handleDOBChange = (newDateValue) => {
    setValues({ ...values, dob: newDateValue });
  };

  const handleMoveInChange = (newDateValue) => {
    setValues({ ...values, moveInDate: newDateValue });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const enableEdit = () => {
    setEditable(!editable);
  };

  const editUserDetails = async () => {
    const body = {
      name: values.name,
      gender: values.gender,
      mobile: values.mobile,
      rentBudgetLimit: values.rentBudgetLimit,
      dietaryPreference: values.dietaryPreference,
      roommateGenderPreference: values.roommateGenderPreference,
      moveInDate: new Date(values.moveInDate),
      country: values.country,
      dob: new Date(values.dob),
      program: values.program,
      intake: values.intake,
      studyLevel: values.studyLevel,
      contactPreference: values.contactPreference,
      linkedIn: values.linkedIn,
    };
    if (values.password !== '') body.password = values.password;
    console.log('accessToken', accessToken);
    console.log('edituserdetails', body);
    const response = await fetchAPI(`http://localhost:8080/user/${userInfo._id}`, 'PUT', body, accessToken.token);
    console.log('response', response);
    dispatch(setUserInfo(response.data));
    enableEdit();
  };
  return (
    <Container maxWidth="md" className='account-container'>
      <Paper elevation={24} className='account-main-paper'>
        <div>
          <h2>My Account Details</h2>
        </div>
        <div>
          <TextField
            label="Name"
            inputProps={{ min: 0, style: { textAlign: 'center' } }}
            id="login-email-textfield"
            sx={{ m: 1, width: '40ch' }}
            value={values.name}
            onChange={handleChange('name')}
            disabled={editable}
          />
          {/* </div> */}
          {/* <div> */}
          <TextField
            label="Email"
            inputProps={{ min: 0, style: { textAlign: 'center' } }}
            id="login-email-textfield"
            sx={{ m: 1, width: '40ch' }}
            value={values.email}
            onChange={handleChange('email')}
            disabled
          />
        </div>
        <div>
          <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
                    Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              disabled={editable}
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
          {/* </div>
        <div> */}
          <TextField
            label="Phone"
            id="login-email-textfield"
            inputProps={{ min: 0, style: { textAlign: 'center' } }}
            sx={{ m: 1, width: '40ch' }}
            value={values.mobile}
            onChange={handleChange('mobile')}
            disabled={editable}
          />
        </div>
        <div>
          <FormControl sx={{ m: 1, width: '40ch' }}>
            <InputLabel id="gender-input-label-id"
              disabled={editable}>
                Gender
            </InputLabel>
            <Select
              labelId="gender-label-id"
              id="gender-preference-id"
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              value={values.gender}
              label="Gender"
              onChange={handleChange('gender')}
              disabled={editable}
            >
              <MenuItem value={'Male'}>
                Male</MenuItem>
              <MenuItem value={'Female'}>
              Female</MenuItem>
              <MenuItem value={'Other'}>
                Other</MenuItem>
            </Select>
          </FormControl>
          {/* </div>
        <div> */}
          <FormControl sx={{ m: 1, width: '40ch' }}>
            <InputLabel htmlFor="rent-budget-limit-label"
              disabled={editable}>
                Rent Budget Limit</InputLabel>
            <OutlinedInput
              id="rent-budget-limit-id"
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              value={values.rentBudgetLimit}
              onChange={handleChange('rentBudgetLimit')}
              startAdornment={<InputAdornment position="start">$
              </InputAdornment>}
              label="Rent Budget Limit"
              disabled={editable}
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: '40ch' }}>
            <InputLabel id="dietary-preference-input-label-id"
              disabled={editable}>
                Dietary Preference
            </InputLabel>
            <Select
              labelId="dietary-preference-label-id"
              id="dietary-preference-id"
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              value={values.dietaryPreference}
              label="Dietary Preference"
              onChange={handleChange('dietaryPreference')}
              disabled={editable}
            >
              <MenuItem value={'Vegan'}>
                Vegan</MenuItem>
              <MenuItem value={'Vegetarian'}>
              Vegetarian</MenuItem>
              <MenuItem value={'Any'}>
                Any</MenuItem>
            </Select>
          </FormControl>
          {/* </div>
        <div> */}
          <FormControl sx={{ m: 1, width: '40ch' }}>
            <InputLabel id="roommate-gender-preference-input-label-id"
              disabled={editable}>
                Roommate Gender Preference
            </InputLabel>
            <Select
              labelId="roommate-gender-preferencer-label-id"
              id="roommate-gender-preference-id"
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              value={values.roommateGenderPreference}
              label="Roommate Gender Preference"
              onChange={handleChange('roommateGenderPreference')}
              disabled={editable}
            >
              <MenuItem value={'Female'}>
                Female</MenuItem>
              <MenuItem value={'Male'}>
                Male</MenuItem>
              <MenuItem value={'Mixed'}>
                Mixed</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Approx. Move-In Date"
              inputFormat="MM/DD/YYYY"
              value={new Date(values.moveInDate)}
              onChange={handleMoveInChange}
              disabled={editable}
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              renderInput={(params) => <TextField sx={{ m: 1, width: '40ch' }}
                {...params} />}
            />
          </LocalizationProvider>
          {/* </div>
        <div> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date of Birth"
              inputFormat="MM/DD/YYYY"
              value={new Date(values.dob)}
              onChange={handleDOBChange}
              disabled={editable}
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              renderInput={(params) => <TextField sx={{ m: 1, width: '40ch' }}
                {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: '40ch' }}>
            <InputLabel id="program-selector-input-label-id"
              disabled={editable}>
                Program
            </InputLabel>
            <Select
              labelId="program-selector-label-id"
              id="program-selector-id"
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              value={values.program}
              label="Program"
              onChange={handleChange('program')}
              disabled={editable}
            >
              <MenuItem value={'Software Engineering Systems'}>
                Software Engineering Systems</MenuItem>
              <MenuItem value={'Information Systems'}>
                Information Systems</MenuItem>
              <MenuItem value={'Data Analytics Engineering'}>
                Data Analytics Engineering</MenuItem>
            </Select>
          </FormControl>
          {/* </div>
        <div> */}
          <FormControl sx={{ m: 1, width: '40ch' }}>
            <InputLabel id="demo-simple-select-helper-label"
              disabled={editable}>Intake</InputLabel>
            <Select
              labelId="intake-selector"
              id="intake-selector-id"
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              value={values.intake}
              label="Intake"
              onChange={handleChange('intake')}
              disabled={editable}
            >
              <MenuItem value={'Fall 2022'}>Fall 2022</MenuItem>
              <MenuItem value={'Spring 2023'}>Spring 2023</MenuItem>
              <MenuItem value={'Fall 2024'}>Fall 2023</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: '40ch' }}>
            <InputLabel id="study-level-input-label-id"
              disabled={editable}>Study Level
            </InputLabel>
            <Select
              labelId="study-level-label-id"
              id="study-label-selector-id"
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              value={values.studyLevel}
              label="Study Level"
              onChange={handleChange('studyLevel')}
              disabled={editable}
            >
              <MenuItem value={'Masters'}>Masters</MenuItem>
              <MenuItem value={'Bachelors'}>Bachelors</MenuItem>
              <MenuItem value={'PhD'}>PhD</MenuItem>
            </Select>
          </FormControl>
          {/* </div>
        <div> */}
          <FormControl sx={{ m: 1, width: '40ch' }}>
            <InputLabel id="contact-preference-input-label-id"
              disabled={editable}>
                Contact Preference
            </InputLabel>
            <Select
              labelId="contace-preference-label-id"
              id="contact-preference-selector-id"
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              value={values.contactPreference}
              label="Contact Preference"
              onChange={handleChange('contactPreference')}
              disabled={editable}
            >
              <MenuItem value={'iMessage'}>iMessage</MenuItem>
              <MenuItem value={'Whatsapp'}>Whatsapp</MenuItem>
              <MenuItem value={'LinkedIn'}>LinkedIn</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField
            label="LinkedIn"
            id="login-email-textfield"
            inputProps={{ min: 0, style: { textAlign: 'center' } }}
            sx={{ m: 1, width: '40ch' }}
            value={values.linkedIn}
            onChange={handleChange('linkedIn')}
            disabled={editable}
          />
        </div>
        <div>
          {editable ? <Button onClick={async () => {
            enableEdit();
          }} className='edit-button' variant="outlined">Edit</Button> :
        <Button onClick={() => {
          enableEdit();
        }} className='edit-button' variant="outlined">Cancel</Button>}
          <Button onClick={async () => {
            await editUserDetails();
          }} className='signup-button' variant="outlined"
          disabled={editable}>
                Submit
          </Button></div>
      </Paper>
    </Container>
  );
}
export default Account;
