import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { ProfileContext } from '../contexts/profileContext.jsx';
import Form from './Form.jsx';
import { registerUser, loginUser } from '../services/authService.js';

export default function Main() {
  const { login } = useContext(ProfileContext);
  const navigate = useNavigate();

  // form input state
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  // auth feedback state
  const [ data, setData ] = useState('');
  const [ err, setErr ] = useState(null);

  // login/signup mode toggle
  const [ isLoginMode, setLoginMode ] = useState(true);

  // derived state from ui
  const submitBtnText = isLoginMode? 'Login' : 'Sign up';
  const toggleBtnText = isLoginMode? 'Sign up' : 'Login';
  const modeText = isLoginMode? 'No account yet?' : 'Already having an account?';


  // handlers
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const calledFunction = isLoginMode? loginUser : registerUser;
      const result = await calledFunction(username, password);

      setData(result);

      if (result.token) {
        login(result.token);
        navigate('/profile');
      }
    } catch (err) {
      console.log(err);
      setErr(err);
    }
  };
  
  const handleSignUpText = () => {
    setLoginMode(prev => !prev);
  };

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };


  return (
    <>
      <div className={data.success? 'status ok-status' : 'status error-status'}>
        {data.message}
      </div>

      <Form
        handleSubmit={handleSubmit}
        handleUsernameInput={handleUsernameInput}
        handlePasswordInput={handlePasswordInput}
        username={username}
        password={password}
        isLoginMode={isLoginMode}
        submitBtnText={submitBtnText}
      />

      <div className="signup-wrapper">
        <p>{modeText}</p>
        <button onClick={handleSignUpText} className="login-btn signup-btn">
          {toggleBtnText}
        </button>
      </div>
    </>
  );
}