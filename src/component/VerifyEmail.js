import { Button } from '@mui/material'
import React from 'react'
import { useAuthValue } from "./AuthContext"
import {useState, useEffect} from 'react'
import {auth} from './Firebase'
import {sendEmailVerification} from 'firebase/auth'
import { useNavigate} from 'react-router-dom';

function VerifyEmail() {
    const {currentUser} = useAuthValue()
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [time, setTime] = useState(60)
    const {timeActive, setTimeActive} = useAuthValue()
    const history = useNavigate()


    useEffect(() => {
        const interval = setInterval(() => {
          currentUser?.reload()
          .then(() => {
            if(currentUser?.emailVerified){
              clearInterval(interval)
              history('/')
            }
          })
          .catch((err) => {
            alert(err.message)
          })
        }, 1000)
      }, [history, currentUser])


    const resendEmailVerification = () => {
        setButtonDisabled(true)
        sendEmailVerification(auth.currentUser)
        .then(() => {
          setButtonDisabled(false)
          setTimeActive(true)
        }).catch((err) => {
          alert(err.message)
          setButtonDisabled(false)
        })
      }

      useEffect(() => {
        let interval = null
        if(timeActive && time !== 0 ){
          interval = setInterval(() => {
            setTime((time) => time - 1)
          }, 1000)
        }else if(time === 0){
          setTimeActive(false)
          setTime(60)
          clearInterval(interval)
        }
        return () => clearInterval(interval);
      }, [timeActive, time])
  
  return (
    <div>
        <h1> Verify your Email Address</h1>
        <h3><b>A Verification emial has been sent to <span>{currentUser?.email}</span></b></h3>
        <p>Follow the instruction in the email to verify your account</p>
        <Button variant="contained" onClick={resendEmailVerification} disabled={timeActive}>Resend Email{timeActive && time}</Button>
    </div>
  )
}

export default VerifyEmail