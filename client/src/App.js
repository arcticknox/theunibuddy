import './App.scss';
import * as React from 'react';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import UserRoom from './components/RoomPage/UserRoom/UserRoom';
import RoomPage from './components/RoomPage/RoomPage';
import PrivateRoute from './utils/PrivateRoute';
import PasswordReset from './components/PasswordReset/PasswordReset';
import Invitations from './components/Invitations/Invitations';
import Profile from './components/Profile/Profile';
import Account from './components/Account/Account';
import ViewRoom from './components/RoomPage/ViewRoom/ViewRoom';
import Blogs from './components/Blogs/Blogs';
import {
  Route,
  BrowserRouter,
  Routes,
} from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>}></Route>
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
          <Route path='/account'element={<PrivateRoute><Account /></PrivateRoute>}></Route>
          <Route element={<Login />} path={'/login'}></Route>
          <Route element={<SignUp />} path={'/signup'}></Route>
          <Route element={<PasswordReset />} path={'/passwordreset'}></Route>
          <Route element={<PrivateRoute><RoomPage /></PrivateRoute>} path={'/roommate'}></Route>
          <Route element={<PrivateRoute><Blogs /></PrivateRoute>} path={'/blogs'}></Route>
          <Route element={<PrivateRoute><UserRoom /></PrivateRoute>} path={'/user-room'}></Route>
          <Route element={<PrivateRoute><ViewRoom /></PrivateRoute>} path={'/view-room'}></Route>
          <Route path='/invitations' element={<PrivateRoute><Invitations /></PrivateRoute>}></Route>
          <Route element={<PrivateRoute><Account /></PrivateRoute>} path={'/account'}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
