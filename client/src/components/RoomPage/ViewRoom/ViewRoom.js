import './ViewRoom.scss';
import * as React from 'react';
import { Box, Container } from '@mui/material';
import MemberCard from '../UserRoom/MemberCard/MemberCard';
import { useLocation } from 'react-router-dom';
import fetchAPI from '../../../utils/fetchAPI';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUserRoomId } from '../../../redux/slices/userRoomSlice';

function ViewRoom(props) {
  const location = useLocation();
  const { userId } = location.state;
  const accessToken = useSelector((state) => state.auth.accessToken.token);
  const userRoom = useSelector((state) => state.userRoom.userRoomId);
  const dispatch = useDispatch();
  const getUserRoommates = async () => {
    const response = await fetchAPI(`http://localhost:8080/room/userRoomId/${userId}`, 'GET', null, accessToken);
    dispatch(setUserRoomId(response.data));
    return response;
  };

  useEffect( ()=>{
    getUserRoommates();
  }, [] );

  return (
    <div>
      {
        <Container maxWidth={'md'} className='filter-container'>
          <div className='view-room-title'>
            <h2> {userRoom[0].userName + '\'s' } Room</h2>
          </div>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '100px', justifyContent: 'space-around' }}>
            {userRoom[0].members.length>0 && userRoom[0].members.map( (listing, index)=>{
              return (
                <div key={index}>
                  <MemberCard cardInfo = {userRoom[0]} member = {listing} type = {'read'}/>
                </div> );
            } )

            }
          </Box>
        </Container>
      }
    </div>
  );
}

export default ViewRoom;
