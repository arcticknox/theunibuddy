import './Navbar.scss';
import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Link,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import AccountMenu from '../AccountMenu/AccountMenu';
import ConnectWithoutContactIcon from
  '@mui/icons-material/ConnectWithoutContact';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LivingIcon from '@mui/icons-material/Living';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import NotificationBell from '../NotificationBell/NotificationBell';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const drawerListData = [
  {
    name: 'Roommate Finder',
    icon: <ConnectWithoutContactIcon fontSize='medium'/>,
    path: '/roommate',
  },
  {
    name: 'My Room',
    icon: <LivingIcon fontSize='medium' />,
    path: '/user-room',
  },
  {
    name: 'Project Finder',
    icon: <PeopleAltIcon fontSize='medium' />,
  },
  {
    name: 'Project',
    icon: <EngineeringIcon fontSize='medium' />,
  },
  {
    name: 'Invitations',
    icon: <GroupAddIcon fontSize='medium' />,
    path: '/invitations',
  },
];

function Navbar(props) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [drawerState, setDrawerState] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className='app-navbar'
        position="sticky" sx={{ bgcolor: '#1C3879' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={() => setDrawerState(true)} />
          </IconButton>
          <Typography variant="h6" component="div"
            sx={{ flexGrow: 1 }}>
            <Link href='/' underline='none' color={'white'}>UniBuddy</Link>
          </Typography>
          {isLoggedIn ?
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '20%' }}>
                  <Box>
                    <NotificationBell />
                  </Box>
                  <AccountMenu />

                </Box> :
          <Button color="inherit" href='/login'>
                Login
          </Button>}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={'left'}
        open={drawerState}
        onClose={() => setDrawerState(false)}
      >
        <div className='drawer-close-icon'>
          <IconButton onClick={() => setDrawerState(false)}>
            <ChevronLeftIcon fontSize='medium'/>
          </IconButton>
        </div>
        <Divider />
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
          <List>
            {drawerListData.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <Link href={item.path} underline='none' color={'white'}>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                  </Link>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Navbar;
