import './Navbar.scss';
import * as React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className='app-navbar'
        position="static" sx={{ bgcolor: '#1C3879' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                UniBuddy
          </Typography>
          {isLoggedIn ?
              <AccountCircleIcon fontSize='large' /> :
              <Button color="inherit" href='/login'>
                Login
              </Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
