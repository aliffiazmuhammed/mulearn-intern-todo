import React from 'react'
import { useEffect, useState } from "react"

import { Link,useNavigate } from 'react-router-dom';

function SignIn() {
    const navigate = useNavigate();
    const [values,setValues] = useState({
        username:"",
        password:"",
    })
    const handleChange = (event)=>{
        setValues({ ...values,[event.target.name] : event.target.value})
    }
    const handleSubmit = async(event)=>{
        event.preventDefault();
        if(values.username && values.password){
            if(localStorage.getItem(values.username)){
                const user = JSON.parse(localStorage.getItem(values.username))
                if(values.password == user.password){
                    localStorage.setItem('loggedInUser', values.username);
                    navigate('/')
                }else{
                    alert('password does not match')
                }
            }else{
                alert('user not found')
            }
        }else{
            alert('fill complete form')
        }
        
    }
  return (
    <div className='container' >
      <form className="new-item-form" onSubmit={(event)=>handleSubmit(event)}>
      <div className="form-row">
        <label htmlFor="item">Name</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(event)=>handleChange(event)}
        />
        <label htmlFor="item">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(event)=>handleChange(event)}
        />
      </div>
      <button className="btn">Sign in</button>
      <span>Don't have an account?<Link to="/signup"> REGISTER</Link></span>
    </form>
    </div>
  )
}

export default SignIn
