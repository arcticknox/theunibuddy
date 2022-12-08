import './NotificationBell.scss';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Badge, Popper, Paper,
  Box, Fade, Divider, Button, IconButton } from '@mui/material';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { setNotificationList,
  resetNotificationList } from '../../redux/slices/notificationSlice';
import NotificationItems from './NotificationItems/NotificationItems';

// Notification Bell component
function NotificationBell() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const accessToken = useSelector((state) => state.auth.accessToken.token);
  const [newNotification, setNewNotification] = useState(false);
  const notificationList =
  useSelector((state) => state.notification.notificationList);
  const dispatch = useDispatch();

  /**
   * Emit subscribe socket event to server
   * @param {Object} userInfo
   * @param {Object} socket
   * @param {String} accessToken
   */
  const subscribeSocket = (userInfo, socket, accessToken) => {
    if (userInfo) {
      const { _id } = userInfo;
      console.log('Subscribing to socket server...');
      socket.emit('subscribe', { id: _id, accessToken });
    }
    return;
  };

  // Subscribe socket connection
  useEffect(() => {
    const socketConn = io(`http://${window.location.hostname}:8080`);
    subscribeSocket(userInfo, socketConn, accessToken);
    // Listen for notification event sent from server
    socketConn.on('notification', (payload) => {
      setNewNotification(true);
      // Update notification list in redux
      dispatch(setNotificationList(payload));
    } );
    return () => {
      // Cleanup socket connection on unmount
      socketConn.close();
    };
  }, []);

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    setNewNotification(false);
  };

  return (
    <div>
      <Badge color="success"
        variant="dot" overlap="circular" invisible={!newNotification}>
        <IconButton onClick={handleToggle} color='inherit'>
          <NotificationsIcon fontSize='large'
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"/>
        </IconButton>

      </Badge>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ p: 1, bgcolor: 'background.paper' }}>
              {notificationList.length ?
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center' }}>
                  <h5><b>Notifications</b></h5>
                  <Button onClick={() => dispatch(resetNotificationList())}
                    variant="text">Clear</Button>
                </Box>
                <Divider />
                <NotificationItems />
              </Box> :
              <h5>No notifications</h5>}
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>

  );
}

export default NotificationBell;
