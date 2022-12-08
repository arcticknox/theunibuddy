
import * as React from 'react';
import './CreateRoom.scss';
import { Container, Paper, TextField, Button,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import fetchAPI from '../../../../utils/fetchAPI';
import { useLayoutEffect } from 'react';
import { setUserRoom } from '../../../../redux/slices/userRoomSlice';

// Create room api call
function CreateRoom(props) {
  const dispatch = useDispatch();
  const userRoom = useSelector((state) => state.userRoom.userRoom);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const accessToken = useSelector((state) => state.auth.accessToken.token);
  const [editable, setEditable] = useState(false);

  const [values, setValues] = useState({
    ...userInfo,
    password: '',
    showPassword: false,
    roomDetails: '',
    roomSize: 0,
  });

  // Get user room api call
  const getUserRoom = async () => {
    const response = await fetchAPI('/room/userRoom', 'GET', null, accessToken);
    await dispatch(setUserRoom(response.data));
    return response;
  };

  useLayoutEffect(() => {
    getUserRoom().then((response)=>{
      if (response.data.userRoom[0].members && response.data.userRoom[0].members.length > 0) {
        setValues({ ...values, roomDetails: response.data.userRoom[0].roomDesc, roomSize: response.data.userRoom[0].maxCount });
        setEditable(true);
      } else {
        setEditable(false);
      }
    });
  }, []);


  const handleChange =
    (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const enableEdit = () => {
    setEditable(!editable);
  };

  const updateRoom = async () => {
    const body = {
      details: values.roomDetails,
      maxCount: values.roomSize,
    };
    await fetchAPI('/room', 'PUT', body, accessToken);
    setEditable(!editable);
  };

  const createNewRoom = async () => {
    const body = {
      members: [userInfo._id],
      details: values.roomDetails,
      maxCount: values.roomSize,
    };
    await fetchAPI('/room', 'POST', body, accessToken);
    setEditable(!editable);
    getUserRoom();
  };

  const callRoomApi = async () => {
    if (userRoom[0].members && userRoom[0].members.length > 0) {
      await updateRoom();
      props.onChange();
    } else {
      await createNewRoom();
    }
  };

  return (
    <Container className='createRoom-container'>
      <Paper elevation={24} className='createRoom-main-paper'>
        <div>
          <h2>My Room Details</h2>
          {console.log(userRoom[0])}
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
            callRoomApi();
          }} className='signup-button' variant="outlined">
                Submit
          </Button></div>
      </Paper>
    </Container>
  );
}

export default CreateRoom;
