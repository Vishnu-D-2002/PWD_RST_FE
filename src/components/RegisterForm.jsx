import React from 'react'
import { Link } from 'react-router-dom';

function UserRegister({handleRegister,registerData,setRegisterData,mgs}) {
  return (
    <div className='container'>
      <form onSubmit={handleRegister} className='inside'>
        <h2>Register Form:</h2>
      <div>
        <label>Email Id:</label><br />
        <input
          type="email"
          value={registerData.username}
          onChange={(e) => {
            setRegisterData({ ...registerData, username: e.target.value });
          }}
          required
        />
      </div>
      <div>
        <label>Full Name:</label><br />
        <input
          type="text"
          value={registerData.name}
          onChange={(e) => {
            setRegisterData({ ...registerData, name: e.target.value });
          }}
          required
        />
      </div>
      <div>
        <label>Password:</label><br />
        <input
          type="password"
          value={registerData.password}
          onChange={(e) => {
            setRegisterData({ ...registerData, password: e.target.value });
          }}
          required
        />
      </div>
      <button type="submit">
        REGISTER
        </button>
        <div>
         <h1>{mgs}</h1> 
        </div>
        <div><Link to='/'>Login</Link></div>
    </form>
  </div>
)
}
export default UserRegister
