import axios from 'axios';
import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import UserLogin from './components/LoginForm';
import UserRegister from './components/RegisterForm';
import ResetPassword from './components/ResetPassword';

function App() {
  const [registerData, setRegisterData] = useState({
    username: '',
    name: '',
    password: ''
  });
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [mgs, setMgs] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      username: registerData.username,
      name: registerData.name,
      password: registerData.password
    };

    try {
      const res = await axios.post('https://pwd-rst-mail.onrender.com/user', data);

      console.log('successfully created');
      setRegisterData({ username: '', name: '', password: '' });
      const info = res.data;
      setMgs(`${info.message}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    const data = {
      username: loginData.username,
      password: loginData.password
    };

    try {
      const res = await axios.post('https://pwd-rst-mail.onrender.com/login', data);
      const info = res.data;
      setMgs(`${info.message}`);
      console.log(info);
      setLoginData({ username: '', password: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div> 
      <Router>
        <Routes> 
          <Route path='/' element={<UserLogin setLoginData={setLoginData} loginData={loginData} handlePassword={handlePassword} mgs={mgs} setMgs={setMgs} />} />
          <Route path='/register' element={<UserRegister setRegisterData={setRegisterData} handleRegister={handleRegister} registerData={registerData} mgs={mgs} setMgs={setMgs} />} />
          <Route path='/reset_password' element={<ResetPassword/>}/>
        </Routes>   
      </Router>
    </div>
  );
}

export default App;