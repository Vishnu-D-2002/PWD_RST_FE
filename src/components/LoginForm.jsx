import React from 'react'
import { Link } from 'react-router-dom';
import "../App.css"
function UserLogin({ handlePassword, loginData, setLoginData, mgs }) {

  return (
    <div className='container'> 
   <div className='inside'> <h2>Login</h2>
    <div><form onSubmit={handlePassword}>
      <div>
        <label>Email Id:</label><br />
        <input
          type="email"
          value={loginData.username}
          onChange={(e) => {
            setLoginData({ ...loginData, username: e.target.value });
          }}
          required
        />
      </div>
      <div className='info'>
        <label>Password:</label><br />
        <input
          type="password"
          value={loginData.password}
          onChange={(e) => {
            setLoginData({ ...loginData, password: e.target.value });
          }}
          required
        />
      </div>
      <button type="submit">
        Submit
        </button>
        <div>
          If New User Please register: 
          <Link to='/register'>Register</Link>
       </div>
    </form></div>
      <div>
<h1>{mgs}</h1>
<Link to='/reset_password'>Forget Password</Link>
</div></div>
  </div>
  )
}

export default UserLogin