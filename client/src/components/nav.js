import React, {useState,useEffect} from 'react';
import '../App.css';
import {Link, Redirect, useHistory } from 'react-router-dom';


const Nav = () =>  {
    const navStyle = {
        color: 'white'
    }
    let history = useHistory();



  return (
    <div>
      <nav>
          <ul className= "nav-links">
              {/* <Link style= {navStyle} to='/login'>
                <li>Login</li>
              </Link>

              <Link style = {navStyle} to ='/register'>
                <li>Register</li>
              </Link> */}
              <Link style = {navStyle} to ='/fuelquote'>
                <li>Fuel Quote Form</li>
              </Link>
              <Link style = {navStyle} to ='/OrderHistory'>
                <li>Order History</li>
              </Link>
              <Link style = {navStyle} to ='/profile'>
                <li>Profile Managerment</li>
              </Link>
              <Link to = '/dashboard'>
              Home
              </Link>
          </ul>
      </nav>
    </div>
  );
}

export default Nav
