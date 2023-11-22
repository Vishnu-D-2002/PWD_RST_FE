import React from 'react';
import axios from 'axios';

const RegisterForm = ({ registerData, setRegisterData, setIsRegistered, toggleForm }) => {
  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      name: registerData.name,
      username: registerData.username,
      password: registerData.password
    };
    await axios.post('http://localhost:3000/user', data);
    setRegisterData({ name: '', username: '', password: '' });
    setIsRegistered(true);
    console.log('User created successfully');
  };

  return (
    <div>
      <h1>Register form</h1>
      <form onSubmit={handleRegister}>
        <label>Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : </label>
        <input
          type='text'
          placeholder='Enter your Name ...'
          value={registerData.name}
          onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
          required
        /><br />
        <label>Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;</label>
        <input
          type='email'
          placeholder='Enter your Email ...'
          value={registerData.username}
          onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
          required
        /><br />
        <label>Password : </label>
        <input
          type='password'
          placeholder='Enter your Password ...'
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
          required
        /><br />
        <button type='submit'>REGISTER</button>
        <p>
          Already Registered?{' '}
          <button type='button' onClick={toggleForm}>
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
