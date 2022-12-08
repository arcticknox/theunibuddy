import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import memberIcon from './memberIcon.png';
import fetchAPI from '../../../utils/fetchAPI';
import { useSelector } from 'react-redux';
import {
  Link,
} from 'react-router-dom';

function RoomCard(props) {
  const [avatarElevation, setAvatarElevation] = useState(4);
  const accessToken = useSelector((state) => state.auth.accessToken.token);
  const sendRequest = async ()=>{
    const body = {
      sUserID: '',
      rUserID: props.cardInfo.members[0][1],
      type: 'room',
    };
    const response = await fetchAPI('http://localhost:8080/invite/send', 'POST', body, accessToken);
    console.log('sendRequest', response);
  };

  return (
    <Card sx={{ width: 300, height: 300, padding: '5%' }} elevation={avatarElevation}
      onMouseOver={ () => setAvatarElevation(24) }
      onMouseOut={() => setAvatarElevation(4)}>
      <img
        alt="listing card"
        width='40%'
        src={memberIcon}

      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.cardInfo.userName}
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
      <CardActions>
        {props.cardInfo.members.length > 0 &&
        <div>
          <Link to='/view-room' state={{ userId: props.cardInfo.members[0][1] }} style={{ textDecoration: 'none' }} underline='none' color={'white'}>
            <Button size="small">View Room</Button>
          </Link>
          <Button onClick={()=>{
            sendRequest();
          }} size="small">Join Room</Button>
        </div>
        }
        {props.cardInfo.members.length === 0 &&
        <div>
          <Button size="small">Invite</Button>
        </div>
        }
      </CardActions>
    </Card>
  );
}
export default RoomCard;
