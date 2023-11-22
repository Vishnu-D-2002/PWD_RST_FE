import React, { useState } from 'react';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

function App() {
  const [registerData, setRegisterData] = useState({
    name: '',
    username: '',
    password: ''
  });
  const [isRegistered, setIsRegistered] = useState(false);

  const toggleForm = () => {
    setIsRegistered(!isRegistered);
  };

  return (
    <div>
      <h1>Welcome to Our Website</h1>
      {isRegistered ? (
        <LoginForm
          registerData={registerData}
          setRegisterData={setRegisterData}
          setIsRegistered={setIsRegistered}
          toggleForm={toggleForm}
        />
      ) : (
        <RegisterForm
          registerData={registerData}
          setRegisterData={setRegisterData}
          setIsRegistered={setIsRegistered}
          toggleForm={toggleForm}
        />
      )}
    </div>
  );
}

export default App;
