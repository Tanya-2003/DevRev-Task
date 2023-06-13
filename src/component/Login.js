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
        
       
            <h2 class="logo"><i class='bx bxl-xing' ></i>Library Management</h2>
            
            <div class="text-sci">
                <h2> Welcome!<br/><span>Login/SignUp</span></h2>


                <p>Hello welcome and more</p><div>
                  <center>
                <Button  variant ="outlined" width="100" onClick={handleGoogleSignIn}> <img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" width={20} height={20}/>&nbsp;&nbsp; Sign In with Google</Button></center><br/><br/>
            <TextField id="outlined" label="Email address" value={email} onChange={(e)=>setEmail(e.target.value)}  />       <br/><br/>
          <TextField label="Password"type="password"autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)}/>    <br/> <br/>
          <span><Link to='/'>Forgot password?</Link></span><br/><br/>
          <Button variant="contained" onClick={login}>Login</Button> &nbsp;&nbsp;&nbsp;
          <Button variant="contained" onClick={handleClick}>Sign up</Button>
        
            </div>
            
            


                <div class="social-icons">
                    <a href="#"><i class='bx bxl-facebook' ></i></a>
                    <a href="#"><i class='bx bxl-twitter' ></i></a>
                    <a href="#"><i class='bx bxl-instagram' ></i></a>
                    <a href="#"><i class='bx bxl-linkedin' ></i></a>

                </div>
        

    </div>
    </div>
  )
}

export default Login
