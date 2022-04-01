import React, {useState} from 'react'
import '../App.css'
import {Link } from 'react-router-dom'


const Register = ({setAuth})=> 
{
  const [inputs, setInputs] =  useState({username: "" , password: ""});
  const {username, password } = inputs;
  const onChange = e => 
    setInputs({...inputs, [e.target.name]: e.target.value});
   
    const onSubmitForm = async (e) =>
    {
  
      e.preventDefault()
      try {
       
        const body = {username,password};
        const response = await fetch("http://localhost:5050/auth/register", {
          method: "POST",
          headers:{"Content-type" : "application/json"},
          body: JSON.stringify(body),
          dataType: 'jsonp'
      });

      const parseRes = await response.json();

      if (parseRes.token)
      {
        localStorage.setItem("token",parseRes.token)
        setAuth(true);
        alert('User has been created! Please start by creating profile');
      }
      else
      {
        alert(parseRes)
      }
      
      } 
      catch (err) 
      {
        console.error(err)
      }
    }



  return (
    <div>
        <form onSubmit = {onSubmitForm}>
          <h2>Register</h2>

          <div>
              <label>Username</label>
              <input
              type="text"
              name="username"     
              placeholder="username"
              value={username}
              onChange = {e => onChange(e)}
              />

              
          </div>
          <div>
              <label>Password</label>
              <input
              type="text"
              name="password"     
              placeholder="password"
              value={password}
              onChange = {e => onChange(e)}              
              ></input>
          </div>
          <div>
            <div>
            <Link to='/login'>
               Already Have an Account?
            
            </Link>
            </div>
            <input type = "submit" value = "Submit" ></input>
          </div>
      </form>
    </div>
  );
}

export default Register;
