import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import header from '../assets/header.png';
import banner from '../assets/banner.png';
import body from '../assets/body.png';
import Loader from '../components/loader/Loader';
import { MdKeyboardArrowRight } from 'react-icons/md';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/user/login`, {
        username,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Login successful!');
      navigate('/account');
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response?.data?.message || error.message || 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-main">
      <img src={header} alt="Header" className="login-header-img" />
      <div className="login-hero">
        <div className="login-banneraera">

          <img src={banner} alt="" />
         
        </div>
        <div className="login-form-area">

        <h2 style={{
          textAlign: "center",
          marginBottom: "20px"
        }}>Sign in to BMO Digital Banking</h2>

          <div className="login-box">

        
            <br />
            {/* Error Message */}
            {errorMessage && (
              <p
                className="login-error-message"
                style={{
                  color: '#d32f2f',
                  fontSize: '14px',
                  marginTop: '10px',
                  textAlign: 'center',
                  padding: '12px',
                  backgroundColor: '#ffebee',
                  border: '1px solid #ffcdd2',
                  borderRadius: '8px',
                  fontWeight: '500',
                  lineHeight: '1.5',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {errorMessage}
              </p>
            )}


            {/* Login Form */}
            <form onSubmit={handleLogin}>
              <div className="login-input-group">

                <input
                  type="text"
                  className="login-input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Username'
                  required
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingTop: '15px',
                  fontSize: "12px",
                  color: "#0075be !important",

                }}
              >
                <a href="#">Forgot Password</a>
              </div>


            

              <div className="login-input-group">
                <input
                  type="password"
                  className="login-input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                  required
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  paddingTop: '15px',
                  fontSize: "12px",
                  color: "#0075be !important",


                }}
              >
                <a href="#">Forgot Password</a>
              </div>



              <br />
              <div style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px"
              }}>

                <button style={{
                  backgroundColor : "#fff",
                  opacity: "1",
                  borderRadius: "50px",
                  padding: " 20px",
                  border: "2px solid #0075be",
                  color: "#0075be !important",
                  width: "40%"
                }} className="login-sign-in-btn login-sign-in-btn-2">
                  {loading ? <Loader /> : 'Register'}
                </button>

                <button style={{
                  backgroundColor : "#0075be",
                  opacity: "1",
                  borderRadius: "50px",
                  padding: "20px",
                  width: "40%"
                }} className="login-sign-in-btn" type="submit" disabled={loading}>
                  {loading ? <Loader /> : 'Sign in'}
                </button>

               
              </div>
            </form>

            {/* Additional Links */}
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/BMO_Logo.svg/1200px-BMO_Logo.svg.png" style={{
                marginTop: "10px"
              }} alt="" />
          </div>
        </div>
      </div>
      <img src={body} alt="Footer" className="login-body-img" />
    </main>
  );
}

export default Login;