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

function UserRoom() {
  const accessToken = useSelector((state) => state.auth.accessToken.token);
  const userRoom = useSelector((state) => state.userRoom.userRoom);
  const dispatch = useDispatch();
  const getUserRoom = async () => {
    const response = await fetchAPI('http://localhost:8080/room/userRoom', 'GET', null, accessToken);
    dispatch(setUserRoom(response.data));
    return response;
  };

  useEffect( ()=>{
    getUserRoom();
  }, [] );

  return (

    <div>
      {
        <div>
          <CreateRoom />
        </div>
      }
      {userRoom && userRoom.length && userRoom[0].members.length>1 &&
        <Container width="100%" className='filter-container'>
          <Paper elevation={24} className='filter-main-paper'>
            <br/>
            <div>
              <h2> {userRoom[0].userName + '\'s' } Room</h2>
            </div>
            <br/>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '100px', justifyContent: 'space-around' }}>
              {userRoom[0].members.length>1 && userRoom[0].members.map( (listing, index)=>{
                return (
                  <Paper key={index} elevation={24}>
                    <MemberCard cardInfo = {userRoom[0]} member = {listing}/>
                  </Paper> );
              } )}
            </Box>
          </Paper>
        </Container>
      }
    </div>
  );
}
export default UserRoom;
