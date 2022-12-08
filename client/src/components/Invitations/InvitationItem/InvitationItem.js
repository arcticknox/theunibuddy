import './InvitationItem.scss';
import { Paper, Box, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import fetchAPI from '../../../utils/fetchAPI';
import { removeFromReceivedList } from '../../../redux/slices/inviteSlice';

// Invitation Item component
function InvitationItem(props) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken.token);
  const { inviteInfo: { name, universityName, _id } } = props;
  // Accept Invite
  const acceptInvitationAPI = async () => {
    const response = await fetchAPI(`http://localhost:8080/invite/accept/${_id}`, 'PUT', { type: 'room' }, accessToken);
    dispatch(removeFromReceivedList(_id));
    return response;
  };
  // Reject Invite
  const declineInvitationAPI = async () => {
    const response = await fetchAPI(`http://localhost:8080/invite/reject/${_id}`, 'PUT', { type: 'room' }, accessToken);
    dispatch(removeFromReceivedList(_id));
    return response;
  };
  return (
    <Paper elevation={4} sx={{ marginBottom: '1%' }}>
      <Box sx={{ padding: '2%', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountCircleIcon fontSize='large' />
          <Box sx={{ marginLeft: '2%' }}>
            <h4 className='invitations-name'>{name}</h4>
            <p className='invitations-university'>{universityName}</p>
          </Box>
        </Box>
        <Box>
          <Button className='decline-button'
            onClick={async () => {
              await declineInvitationAPI();
            }}
            variant="text">Decline</Button>
          <Button className='accept-button'
            onClick={async () => {
              await acceptInvitationAPI();
            }}
            variant="contained">Accept</Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default InvitationItem;
