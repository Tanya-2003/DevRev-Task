import React,{useState} from 'react'
import './style.css';
import {TextField,Button} from '@mui/material';
import { useNavigate,Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';


import { signInWithEmailAndPassword, sendEmailVerification, signInWithPopup } from 'firebase/auth';

import {auth,provider} from './Firebase'
import "./style.css";
import { useAuthValue } from "./AuthContext"


import "./style.css";


function Login
() {
    let history = useNavigate();
  const {currentUser} = useAuthValue()
  const {setTimeActive} = useAuthValue()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [value,setValue]=useState('')
  
const handleClick=()=>{
  console.log(currentUser)
  history('/Register');
}
const login = e => {
  e.preventDefault()
  signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    if(!auth.currentUser.emailVerified) {
      sendEmailVerification(auth.currentUser)
      .then(() => {
        setTimeActive(true)
        history('/VerifyEmail')
      })
    .catch(err => alert(err.message))
  }else{
    history('/Home')
  }
  })
  .catch(err => setError(err.message))
}


  const handleGoogleSignIn =  e => {

    e.preventDefault()
    try {
      signInWithPopup(auth, provider).then(()=>{
        history('/Home')
      })
      .catch(err=>alert(err.message))
        
      // Sign-in successful, perform additional actions or redirect
    } catch (error) {
      console.error(error);
    }
  };
       
  return (
    <div>
        
        <header className="header">
      <nav className="navbar">
        <a href="main.html" className="logo"></a>
        <a href="main.html" className="active">Home</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <a href="login.html" className="right">Login</a>
      </nav>
      <form action="#" className="search-bar">
        <input type="text" placeholder="Search..." />
        <button type="submit"><i className='bx bx-search-alt'></i></button>
      </form>
    </header>
    <div class="background"></div>

    <div class="container">
        <div class="content">
        <h2 class="logo"><box-icon type='logo' name='firebase'></box-icon>Nora's Nook</h2>
            
            <div class="text-sci">
                <h2> Welcome Book Worms!<br/><span>Login/SignUp</span></h2>


                <p>Let's get started</p><div>
                  <center>
                <Button  variant ="outlined" width="100" onClick={handleGoogleSignIn}> <img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" width={20} height={20}/>&nbsp;&nbsp; Sign In with Google</Button></center><br/><br/>
            <TextField id="outlined" label="Email address" value={email} onChange={(e)=>setEmail(e.target.value)}  />       <br/><br/>
          <TextField label="Password"type="password"autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)}/>    <br/> <br/>
          <span><Link to='/'>Forgot password?</Link></span><br/><br/>
          <Button variant="contained" onClick={login}>Login</Button> &nbsp;&nbsp;&nbsp;
          <Button variant="contained" onClick={handleClick}>Sign up</Button>
        
            </div>
            
                <div class="social-icons">
                    <a href="#"><box-icon name='facebook-circle' type='logo' ></box-icon></a>
                    <a href="#"><box-icon name='twitter' type='logo' ></box-icon></a>
                    <a href="#"><box-icon name='instagram-alt' type='logo' ></box-icon></a>
                    <a href="#"><box-icon name='linkedin-square' type='logo' ></box-icon></a>

                </div>
              </div>
            </div>
        </div> 
    </div>
  )
}

export default Login
