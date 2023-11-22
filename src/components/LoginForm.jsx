import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ registerData, setRegisterData, setIsRegistered, toggleForm }) => {
  const [loginError, setLoginError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();
    const data = {
      username: registerData.username,
      password: registerData.password
    };

    try {
      const response = await axios.post('http://localhost:3000/login', data);
      console.log('User logged in successfully', response.data);
      window.localStorage.setItem('token', response.data.token);
      window.localStorage.setItem('username', response.data.username);
      setIsLoggedIn(true);
      setLoginError(false);
    } catch (error) {
      console.error('Error during login', error);
      setLoginError(true);
      setIsLoggedIn(false);
    }
    setRegisterData({ username: '', password: '' });
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Hello, {localStorage.getItem('username')}!</h1>

          {/* Display the logged-in content here */}
        </div>
      ) : (
        <div>
          <h1>Login form</h1>
          <form onSubmit={handleLogin}>
            <label>Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;</label>
            <input
              type='email'
              placeholder='Enter your Email ...'
              value={registerData.username}
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
            />
            <br />
            <label>Password : </label>
            <input
              type='password'
              placeholder='Enter your Password ...'
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
              <br />
            {loginError && (
              <div>
                <p>Incorrect Password. Please try again or 
                <button type='button'>
                  RESET PASSWORD
                </button></p>
              </div>
            )}
            <button type='submit'>LOGIN</button>

            <p>
              Not Registered?{' '}
              <button type='button' onClick={toggleForm}>
                Register
              </button>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
