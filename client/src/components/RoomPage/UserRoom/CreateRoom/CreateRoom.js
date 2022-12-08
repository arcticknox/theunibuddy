
import * as React from 'react';
import './CreateRoom.scss';
import { Container, Paper, TextField, Button,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import fetchAPI from '../../../../utils/fetchAPI';

function CreateRoom() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const accessToken = useSelector((state) => state.auth.accessToken.token);
  const [values, setValues] = useState({
    ...userInfo,
    password: '',
    showPassword: false,
    roomDetails: '',
    roomSize: 0,
  });
  const [editable, setEditable] = useState(false);

  const handleChange =
          (prop) => (event) => {
            setValues({ ...values, [prop]: event.target.value });
          };

  const enableEdit = () => {
    setEditable(!editable);
  };

  const createNewRoom = async () => {
    const body = {
      members: [userInfo._id],
      details: values.roomDetails,
      maxCount: values.roomSize,
    };
    await fetchAPI('http://localhost:8080/room', 'POST', body, accessToken);
    setEditable(!editable);
  };

  return (
    <Container className='createRoom-container'>
      <Paper elevation={24} className='createRoom-main-paper'>
        <div>
          <h2>My Room Details</h2>
        </div>
        <div>
          <TextField
            label="Name"
            inputProps={{ min: 0, style: { textAlign: 'center' } }}
            id="login-email-textfield"
            sx={{ m: 1, width: '30ch' }}
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
            sx={{ m: 1, width: '30ch' }}
            value={values.email}
            onChange={handleChange('email')}
            disabled
          />
          <TextField
            label="RoomSize"
            id="login-email-textfield"
            inputProps={{ min: 0, style: { textAlign: 'center' } }}
            sx={{ m: 1, width: '20ch' }}
            value={values.roomSize}
            onChange={handleChange('roomSize')}
            disabled={editable}
          />
        </div>
        <div>
          <TextField
            label="Room Bio"
            inputProps={{ min: 0, style: { textAlign: 'center' } }}
            id="login-email-textfield"
            sx={{ m: 1, width: '84ch' }}
            value={values.roomDetails}
            onChange={handleChange('roomDetails')}
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
          <Button onClick={() => {
            createNewRoom();
          }} className='signup-button' variant="outlined">
                Submit
          </Button></div>
      </Paper>
    </Container>
  );
}

export default CreateRoom;
