import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [res_mgs, setRes_Mgs] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewpassword] = useState('');
  const navigate = useNavigate();
  const [mail, setMail] = useState('');

  const handleSendOTP = async (e) => {
    e.preventDefault();

    const data = {
      username: email.username,
    };

    try {
      const res = await axios.post('https://pwd-rst-mail.onrender.com/login/reset-password', data);

      console.log('successfully Reset mail Sent');
      setEmail({ username: '' });
      const info = res.data;
      setRes_Mgs(`${info.message}`);
    } catch (error) {
      console.log(error);
    }
  };

  const changeNewPassword = async (e) => {
    e.preventDefault();
      const data = {
          email:mail,
          randomString: otp,
          newPassword:newPassword
      }
      console.log(data);
    try {
      const response = await axios.post(
        `https://pwd-rst-mail.onrender.com/login/complete-reset`,
        data
      );

      console.log('new Password Change', response.data);
      setNewpassword('');
      const info = response.data;
      setRes_Mgs(`${info.message}`); 
        navigate('/');
      
    } catch (error) {
      console.error('Error changing password', error);
    }
  };

  return (
    <div className='container'>
       <div className='inside'> <div>
        <h2>Reset Password</h2>
        <label>Email Id:</label><br />
        <input
          type="email"
          value={email.username}
          onChange={(e) => {
            setEmail({ ...email, username: e.target.value });
          }}
          required
        />
        <div>
          <button onClick={handleSendOTP}>Send OTP</button>
        </div>
        <h1>{res_mgs}</h1>
      </div>
      {res_mgs === 'Email sent successfully' ? (
          <div>
            <div>
            <label >EMAIL </label><br></br>
            <input
              type="email"
              value={mail}
            onChange={(e) => {
            setMail(  e.target.value );
              }}
              required
            />
          </div>          
          <div>
            <label>Enter OTP</label>
            <input
              type="password"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              required
            />
          </div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword.newPassword}
            onChange={(e) => {
              setNewpassword(e.target.value );
            }}
            required
          />
          <button onClick={changeNewPassword}>submit</button>
          <h1>{res_mgs}</h1>
        </div>
      ) : null}<Link to='/'>Login</Link></div>
    </div>
  );
}

export default ResetPassword;