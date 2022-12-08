import './Invitations.scss';
import * as React from 'react';
import { Container, Paper } from '@mui/material';
import { useEffect } from 'react';
import _ from 'lodash';
import fetchAPI from '../../utils/fetchAPI';
import { useSelector, useDispatch } from 'react-redux';
import { setReceivedList,
  resetReceivedList } from '../../redux/slices/inviteSlice';
import InvitationItem from './InvitationItem/InvitationItem';

// Invitations component
function Invitations() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken.token);
  const receivedList = useSelector((state) => state.invite.receivedList);

  // Fetch received invitations api call
  const fetchInvitations = async () => {
    const response = await fetchAPI('http://localhost:8080/invite/recieved/room', 'GET', null, accessToken);
    return _.get(response, 'data.invites');
  };

  // Fetch invitations on mount
  useEffect(() => {
    fetchInvitations().then((items) => {
      dispatch(setReceivedList(items));
      return () => dispatch(resetReceivedList());
    });
  }, []);
  return (
    <Container maxWidth="md" className='invitations-container'>
      <Paper elevation={24}
        textAlign='center'
        className='invitations-main-paper'>
        <div>
          <h2>Roommate Invitations</h2>
        </div>
        {receivedList.map((invite, index) => {
          return <InvitationItem key={index} inviteInfo={invite}/>;
        },
        )}
      </Paper>
    </Container>
  );
}

export default Invitations;
