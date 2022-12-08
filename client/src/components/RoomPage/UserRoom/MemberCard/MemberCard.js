import * as React from 'react';
import './MemberCard.scss';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import fetchAPI from '../../../../utils/fetchAPI';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { setUserInfo, setUserRoom } from '../../../../redux/slices/userRoomSlice';
import memberIcon from '../../RoomCard/memberIcon.png';

// Member card component
function MemberCard(props) {
  const dispatch = useDispatch();
  const [avatarElevation, setAvatarElevation] = useState(4);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const accessToken = useSelector((state) => state.auth.accessToken.token);
  const userInfo = useSelector((state) => state.userRoom.userInfo );
  const loggedUserInfo = useSelector((state) => state.auth.userInfo );
  // Remove user api call
  const removeUser = async () => {
    const body = {
      sUserID: '',
      rUserID: props.cardInfo.members[0][1],
      type: 'room',
    };
    await fetchAPI(`/room/kickMember/${props.member[1]}`, 'DELETE', body, accessToken);
    getUserRoom();
  };

  // Invite send api call
  const sendRequest = async (flag = true)=>{
    const body = {
      sUserID: '',
      rUserID: props.cardInfo.members[0][1],
      type: 'room',
      join: flag,
    };
    await fetchAPI('/invite/send', 'POST', body, accessToken);
  };

  // Get user room api call
  const getUserRoom = async () => {
    const response = await fetchAPI('/room/userRoom', 'GET', null, accessToken);
    dispatch(setUserRoom(response.data));
    return response;
  };

  // Get user info api call
  const getUserInfo = async () =>{
    const response = await fetchAPI(`/user/${props.member[1]}`, 'GET', null, accessToken);
    dispatch(setUserInfo(response));
    handleOpen();
  };

  const muiBoxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Card sx={{ width: 300, height: 300, padding: '5%', textAlign: 'center' }} elevation={avatarElevation}
      onMouseOver={ () => setAvatarElevation(24) }
      onMouseOut={() => setAvatarElevation(4)}>
      <img
        alt="listing card"
        width='40%'
        src={memberIcon}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.member[0]}
        </Typography>
        <Typography variant="body2" color="text.secondary" align='left'>
          Room Bio: {props.cardInfo.roomDesc !== ''? props.cardInfo.roomDesc : 'No Details'}
          <div>
            {props.cardInfo.members.length > 0 &&
                <div>
                    Spots Left: {props.cardInfo.maxCount - props.cardInfo.members.length}
                </div>
            }
            {props.cardInfo.members.length === 0 &&
                <div>
                    Room does not exist
                </div>
            }
          </div>
        </Typography>
      </CardContent>
      {
        props.type !== 'read' &&
      <CardActions>
        {props.cardInfo.members.length > 0 &&
        <div>
          <Button onClick={()=>{
            getUserInfo();
          }} size="small">View Profile</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={muiBoxStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {userInfo.name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div>
                  Email: {userInfo.email}
                </div>
                <div>
                  Mobile: {userInfo.mobile}
                </div>
                <div>
                  Program: {userInfo.program}
                </div>
                <div>
                  Gender Pref: {userInfo.roommateGenderPreference}
                </div>
                <div>
                  Food Pref: {userInfo.dietaryPreference}
                </div>
              </Typography>
              <br/>
              <Button variant="outlined" >View Details</Button>
            </Box>
          </Modal>
          {console.log(props.member, userInfo.name, loggedUserInfo.name)}
          {props.member[0]=== loggedUserInfo.name &&
                    <Button onClick={()=>{
                      removeUser();
                    }} size="small">Leave</Button>
          }
          {
            props.member[0] !== loggedUserInfo.name &&
          <Button onClick={()=>{
            removeUser();
          }} size="small">Remove</Button>
          }
        </div>
        }
        {props.cardInfo.members.length === 0 &&
        <div>
          <Button onClick={ ()=>{
            sendRequest(false);
          } } size="small">Invite</Button>
        </div>
        }
      </CardActions>
      }
      {
        props.type === 'read' &&
        <CardActions>
          <Button onClick={()=>{
            getUserInfo();
          }} size="small">View Profile</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={muiBoxStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {userInfo.name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div>
                  Email: {userInfo.email}
                </div>
                <div>
                  Mobile: {userInfo.mobile}
                </div>
                <div>
                  Program: {userInfo.program}
                </div>
                <div>
                  Gender Pref: {userInfo.roommateGenderPreference}
                </div>
                <div>
                  Food Pref: {userInfo.dietaryPreference}
                </div>

              </Typography>
            </Box>
          </Modal>
          {loggedUserInfo.name !== props.cardInfo.members[0][0] && <Button onClick={()=>{
            sendRequest();
          }} size="small">Join Room</Button>}

          {loggedUserInfo.name === props.cardInfo.members[0][0] && <Button disabled='true' size="small">Join Room</Button>}
        </CardActions>
      }
    </Card>
  );
}

export default MemberCard;
