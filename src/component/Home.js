import React from 'react'
import { TextField } from '@mui/material'
import AddtoCart from './AddtoCart'
import Search from '../Search'

function Home() {
  return (
    <div>
      
       <nav class="navbar1">
            <a href="main.html" class="active">Home</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
            <a href="login.html" class="right">Login</a>
            <div className='searchbar1'>
            <a href="main.html" class="active"><AddtoCart/></a>
            </div>
        </nav>
        <h2 class="logo"><i class='bx bxl-xing' ></i>Library Management</h2>
          
        <Search/>  <br/><br/><br/><br/><br/><br/>
        
        
    </div>
  )
}

export default Home