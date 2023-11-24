import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ registerData, setRegisterData, setIsRegistered, toggleForm }) => {
  const [loginError, setLoginError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showResetEmailInput, setShowResetEmailInput] = useState(false);
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordResetCompleted, setPasswordResetCompleted] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username: registerData.username,
      password: registerData.password,
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

  const handleResetPassword = async () => {
    if (!showResetEmailInput) {
      setShowResetEmailInput(true);
    } else {
      try {
        const response = await axios.post('http://localhost:3000/login/reset-password', {
          email: resetEmail,
        });

        console.log('Password reset link sent successfully', response.data);
        setResetSuccess(true);
        setShowResetEmailInput(false);
      } catch (error) {
        console.error('Error during password reset link sending', error);
        setResetSuccess(false);
      }
    }
  };

  const handlePasswordResetted = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login/complete-reset', {
        email,
        randomString: resetCode,
        newPassword,
      });

      console.log('Password resetted successfully', response.data);

      // Set the state to indicate that password reset is completed
      setPasswordResetCompleted(true);

      // Clear the input fields
      setEmail('');
      setResetCode('');
      setNewPassword('');

      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error during password reset', error);
    }
  };

  return (
    <div>
      {passwordResetCompleted ? (
      <div>
        <h1>Password Reset Completed</h1>
        <p>You can now log in with your new password.</p>
          {isLoggedIn ? (
            <div>
              <h1>Hello, {localStorage.getItem('username')}!</h1>
            </div>
          ) : (
            <form onSubmit={handleLogin}>
              <label>Email: </label>
              <input
                type='email'
                placeholder='Enter your Email ...'
                value={registerData.username}
                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              />
              <br />
              <label>Password: </label>
              <input
                type='password'
                placeholder='Enter your Password ...'
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              />
              <br />
              <button type='submit' onClick={handleLogin}>LOGIN</button>
              <p>
                Not Registered?{' '}
                <button type='submit' onClick={toggleForm}>
                  Register
                </button>
              </p>
            </form>
          )}
        </div>
      ) : isLoggedIn ? (
        <div>
          <h1>Hello, {localStorage.getItem('username')}!</h1>
        </div>
      ) : (
        <div>
          <h1>Login form</h1>
          <form onSubmit={handleLogin}>
            <label>Email :</label>
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
            <button type='submit'>LOGIN</button>
            {loginError && (
              <div>
                <p>
                  Incorrect Password. Please try again or{' '}
                  <button onClick={handleResetPassword}>
                    {showResetEmailInput ? 'RESET PASSWORD' : 'RESET PASSWORD'}
                  </button>
                </p>
                {showResetEmailInput && (
                  <div>
                    <label>Email :</label>
                    <input
                      type='email'
                      placeholder='Enter your Email ...'
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                    />
                    <br />
                    <button type='submit' onClick={handleResetPassword}>
                      RESET PASSWORD
                    </button>
                  </div>
                )}
              </div>
            )}
            {resetSuccess && (
              <div>
                <p>Password reset link sent successfully. Please check your email.</p>
                <div>
                  <label>Email :</label>
                  <input
                    type='email'
                    placeholder='Enter your Email ...'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                  <label>Code :</label>
                  <input
                    type='text'
                    placeholder='Enter the code from your email ...'
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                  />
                  <br />
                  <label>New Password :</label>
                  <input
                    type='password'
                    placeholder='Enter your new password ...'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <br />
                  <button type='submit' onClick={handlePasswordResetted}>
                    RESET PASSWORD
                  </button>
                </div>
              </div>
            )}

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
