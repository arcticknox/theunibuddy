import './App.scss';
import * as React from 'react';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import PrivateRoute from './utils/PrivateRoute';
import PasswordReset from './components/PasswordReset/PasswordReset';
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
          <Route path='/'
            element={<PrivateRoute><Home /></PrivateRoute>}></Route>
          <Route element={<Login />} path={'/login'}></Route>
          <Route element={<SignUp />} path={'/signup'}></Route>
          <Route element={<PasswordReset />} path={'/passwordreset'}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
