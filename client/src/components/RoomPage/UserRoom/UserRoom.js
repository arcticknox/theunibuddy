import React, { useEffect } from 'react';
import fetchAPI from '../../../utils/fetchAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setUserRoom } from '../../../redux/slices/userRoomSlice';
import CreateRoom from './CreateRoom/CreateRoom';
import { Box } from '@mui/system';
import MemberCard from './MemberCard/MemberCard';
import { Paper,
  Container,
} from '@mui/material';

// User room component
function UserRoom() {
  const accessToken = useSelector((state) => state.auth.accessToken.token);
  const userRoom = useSelector((state) => state.userRoom.userRoom);
  const dispatch = useDispatch();
  // Get users api call
  const getUserRoom = async () => {
    const response = await fetchAPI('/room/userRoom', 'GET', null, accessToken);
    dispatch(setUserRoom(response.data));
    return response;
  };
  // Fetch on mount
  useEffect( ()=>{
    getUserRoom();
  }, [] );

  return (
    <div>
      {
        <div>
          {<CreateRoom cardInfo = {userRoom[0]} onChange = {getUserRoom}/>}
        </div>
      }
      {userRoom && userRoom.length && userRoom[0].members.length>0 &&
        <Container width="100%" className='filter-container'>
          <br/>
          <div>
            <h2> {userRoom[0].userName + '\'s' } Room</h2>
          </div>
          <br/>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '100px', justifyContent: 'space-around' }}>
            {userRoom[0].members.length>0 && userRoom[0].members.map( (listing, index)=>{
              return (
                <Paper key={index} elevation={24}>
                  <MemberCard cardInfo = {userRoom[0]} member = {listing}/>
                </Paper> );
            } )}
          </Box>
        </Container>
      }
    </div>
  );
}

export default UserRoom;
