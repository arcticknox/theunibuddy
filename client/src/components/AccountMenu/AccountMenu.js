import * as React from 'react';
import './AccountMenu.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState, useRef, useEffect } from 'react';
import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Stack,
  IconButton,
} from '@mui/material';
import fetchAPI from '../../utils/fetchAPI';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';

// Account Menu component
function AccountMenu() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const refreshToken = useSelector((state) => state.auth.refreshToken.token);
  const accessToken = useSelector((state) => state.auth.accessToken.token);
  const dispatch = useDispatch();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // User logout api call
  const logoutUserAPI = async () => {
    await fetchAPI('/auth/logout', 'POST', { refreshToken }, accessToken);
    dispatch(logoutUser());
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <div>
          <IconButton onClick={handleToggle} color='inherit'>
            <AccountCircleIcon fontSize='large'
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"/>
          </IconButton>

          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <a href='/account'><MenuItem onClick={handleClose}>
                      Account</MenuItem></a>
                      <a href='/profile'><MenuItem>
                      Profile</MenuItem></a>
                      <MenuItem onClick={async () => await logoutUserAPI()}>
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>
    </div>
  );
}

export default AccountMenu;
