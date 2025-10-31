import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import bg from '../assets/pexels.jpg'
import yogo from '../navigation/file_images/yogoo.jpg'
import wp from '../assets/pexels.jpg'
const Login = () => {
  const [Emaili, setEmaili] = useState('');
  const [Code, setCode] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const bgStyle = {
  backgroundImage: `url(${wp})`,
backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    marginTop:'0px',
  };

  const buton = 'Login';
  const url = 'https://adminpanel-8j8g.onrender.com/authority/login';

  const navigate = useNavigate();

  const butt = useRef(null);



  const hoover = (event) => {
    event.target.style.cursor = 'pointer';
  }
  const login = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      try {
        const userRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        const emails = userRes.data.email;
        if (!emails) {
          alert('Google login failed: No email found');
          return;
        }
        // Only send email to backend for Google login
        axios.post(url, { Email: emails },{ withCredentials: true })
          .then(response => {
            if (response.data.status === 'success') {
              navigate('/dashboard');
              localStorage.setItem('token',response.data.token);
            } else {
              alert('Record does not exist');
            }
          })
          .catch(error => {
            console.error('Error during login:', error);
            alert('Login failed');
          });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
  });

// useEffect(() => {
//   const btn = butt.current;
//   btn.addEventListener('mouseover', hoover);
//   btn.addEventListener('mouseout', hoover);
//   return () => {
//     btn.removeEventListener('mouseover', hoover);
//     btn.removeEventListener('mouseout', hoover);
//   };
// }, []);
  const Login = (e) => {
    e.preventDefault();
    const ddata = {
      Emaili: Emaili,
      Code: Code
    } 

Object.values(ddata).every(val => String(val).trim() !== '') &&
  axios.post(url, ddata )
      .then(Response => {
      alert(Response.data.message || Response.data);
        if (Response.data.status =='success') {
          navigate('/dashboard');
          localStorage.setItem('token',Response.data.token);

        }
        else {
         console.error('you record does not exist');
         }
       })
      .catch(error => alert(error));
  }


  return (
    <div>
      <div className="form-page">

<div className='pic-background' style={bgStyle}>
 < div className='title-heading'>
<img src={yogo} alt="yogo" classsName='yogo-header' style={{objectFit:'cover'}}/>
<p>yogo blast</p>
</div>
<section className='near-bottom'>
  <h1 className='bt-hd'>
    Find your sweet test
  </h1>
  <h5>
    Make orders and deliver them on time
  </h5>
</section>

  </div>
  <div >
        <form onSubmit={Login} className='form-inputs' >
          <h1>Welcome back to yogoBlast</h1>
          <h5>sign in to your account</h5>
          <label htmlFor="">Email:</label>
          <input type="email" onChange={(e) => { setEmaili(e.target.value) }} /> <br />
          <label htmlFor="">password</label> <input type='password' onChange={(e) => setCode(e.target.value)} /><br />
          <input type="submit" value={buton} className='login'/><br />
        </form>

        <button onClick={login} className='google'>
          Continue with google
        </button>

        {/* <button onClick={() => navigate('signup')} ref={butt} className='acct'>CREATE ACCOUNT</button> */}
      </div>
</div>
    </div>
  )
}

export default Login




