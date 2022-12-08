import './NotificationItems.scss';
import * as React from 'react';
import { Box, Link } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';

// Notification Items component
function NotificationItems() {
  const notificationList =
  useSelector((state) => state.notification.notificationList);
  return (
    <div>
      {/* Show most recent notifications */}
      {notificationList.slice(0).slice(-5).map((item, index) => (
        <Link key={index} href='/invitations' underline='none'>
          <Box sx={{ display: 'flex', justifyContent: 'center',
            alignItems: 'center', gap: '5%' }}>
            <AccountCircleIcon />
            <p>{item}</p>

          </Box>
        </Link>
      ))}
    </div>
  );
}

export default NotificationItems;
