import React, { useEffect, useState } from 'react';
import './RoomPage.scss';
import RoomCard from './RoomCard/RoomCard';
import { Box } from '@mui/system';
import fetchAPI from '../../utils/fetchAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setUsersList } from '../../redux/slices/listingSlice';
import { Container, Paper, FormControl,
  OutlinedInput, InputAdornment, InputLabel, Button,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const initialFilterState = {
  rentBudgetLimit: '',
  dietaryPreference: '',
  roommateGenderPreference: '',
  program: '',
  intake: '',
  studyLevel: '',
};

function RoomPage() {
  const accessToken = useSelector((state) => state.auth.accessToken.token);
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.listing.usersList);
  const getAllListings = async () => {
    const response = await fetchAPI('http://localhost:8080/room/listings?pageNumber=1&nPerPage=10`', 'GET', null, accessToken);
    return response;
  };


  const [values, setValues] = useState(initialFilterState);

  const applyFilter = async () => {
    const response = await fetchAPI(`http://localhost:8080/room/listings?rentBudgetLimit=${values.rentBudgetLimit}&dietaryPreference=${values.dietaryPreference}&roommateGenderPreference=${values.roommateGenderPreference}&program=${values.program}&intake=${values.intake}&studyLevel=${values.studyLevel}&pageNumber=1&nPerPage=10`, 'GET', null, accessToken);
    dispatch(setUsersList(response.data.listingData));
    return response;
  };

  const handleChange =
        (prop) => (event) => {
          setValues({ ...values, [prop]: event.target.value });
        };

  useEffect(()=>{
    getAllListings().then((res) => {
      dispatch(setUsersList(res.data.listingData));
    });
  }, [] );

  return (
    <div>
      <br/>
      <div>
        <Container width="100%" className='filter-container'>
          <Paper elevation={24} className='filter-main-paper'>
            <div>
              <h2>Search Filter</h2>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: '20ch' }}>
                <InputLabel htmlFor="rent-budget-limit-label">
                Rent Budget Limit</InputLabel>
                <OutlinedInput
                  id="rent-budget-limit-id"
                  inputProps={{ min: 0, style: { textAlign: 'center' } }}
                  value={values.rentBudgetLimit}
                  onChange={handleChange('rentBudgetLimit')}
                  startAdornment={<InputAdornment position="start">$
                  </InputAdornment>}
                  label="Rent Budget Limit"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: '20ch' }}>
                <InputLabel id="dietary-preference-input-label-id">
                Dietary Preference
                </InputLabel>
                <Select
                  labelId="dietary-preference-label-id"
                  id="dietary-preference-id"
                  inputProps={{ min: 0, style: { textAlign: 'center' } }}
                  value={values.dietaryPreference}
                  label="Dietary Preference"
                  onChange={handleChange('dietaryPreference')}
                >
                  <MenuItem value={'Vegan'}>
                Vegan</MenuItem>
                  <MenuItem value={'Vegetarian'}>
              Vegetarian</MenuItem>
                  <MenuItem value={'Any'}>
                Any</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: '20ch' }}>
                <InputLabel id="roommate-gender-preference-input-label-id">
                Gender Preference
                </InputLabel>
                <Select
                  labelId="roommate-gender-preferencer-label-id"
                  id="roommate-gender-preference-id"
                  inputProps={{ min: 0, style: { textAlign: 'center' } }}
                  value={values.roommateGenderPreference}
                  label="Roommate Gender Preference"
                  onChange={handleChange('roommateGenderPreference')}
                >
                  <MenuItem value={'Female'}>
                Female</MenuItem>
                  <MenuItem value={'Male'}>
                Male</MenuItem>
                  <MenuItem value={'Mixed'}>
                Mixed</MenuItem>
                </Select>
              </FormControl>
              {/* </div>
            <div> */}
              <FormControl sx={{ m: 1, width: '20ch' }}>
                <InputLabel id="program-selector-input-label-id">
                Program
                </InputLabel>
                <Select
                  labelId="program-selector-label-id"
                  id="program-selector-id"
                  inputProps={{ min: 0, style: { textAlign: 'center' } }}
                  value={values.program}
                  label="Program"
                  onChange={handleChange('program')}
                >
                  <MenuItem value={'Software Engineering Systems'}>
                Software Engineering Systems</MenuItem>
                  <MenuItem value={'Information Systems'}>
                Information Systems</MenuItem>
                  <MenuItem value={'Data Analytics Engineering'}>
                Data Analytics Engineering</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: '20ch' }}>
                <InputLabel id="demo-simple-select-helper-label">Intake</InputLabel>
                <Select
                  labelId="intake-selector"
                  id="intake-selector-id"
                  inputProps={{ min: 0, style: { textAlign: 'center' } }}
                  value={values.intake}
                  label="Intake"
                  onChange={handleChange('intake')}
                >
                  <MenuItem value={'Fall 2022'}>Fall 2022</MenuItem>
                  <MenuItem value={'Spring 2023'}>Spring 2023</MenuItem>
                  <MenuItem value={'Fall 2024'}>Fall 2023</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, width: '20ch' }}>
                <InputLabel id="study-level-input-label-id">Study Level
                </InputLabel>
                <Select
                  labelId="study-level-label-id"
                  id="study-label-selector-id"
                  inputProps={{ min: 0, style: { textAlign: 'center' } }}
                  value={values.studyLevel}
                  label="Study Level"
                  onChange={handleChange('studyLevel')}
                >
                  <MenuItem value={'Masters'}>Masters</MenuItem>
                  <MenuItem value={'Bachelors'}>Bachelors</MenuItem>
                  <MenuItem value={'PhD'}>PhD</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" className='apply-filter' onClick={async () => {
                await applyFilter();
              }}>Apply</Button>
              <Button variant="outlined" className='clear-filter' onClick={async () => {
                setValues(initialFilterState);
                await applyFilter();
              }}>Clear</Button>
            </div>
            <br />
          </Paper>
        </Container>
      </div>
      <br/>
      <Container width="100%" className='filter-container'>
        <Paper elevation={24} className='filter-main-paper'>
          <br/>
          <div>
            <h2>User Listings</h2>
          </div>
          <br/>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '100px', justifyContent: 'space-around' }}>
            {usersList && usersList.length ? usersList.map( (listing, index)=>{
              return (

                <Paper key={index} elevation={24}>
                  <RoomCard cardInfo = {listing}/>
                </Paper>
              );
            } ): 'No listing'}
          </Box>
        </Paper>
      </Container>
    </div>


  );
}

export default RoomPage;
