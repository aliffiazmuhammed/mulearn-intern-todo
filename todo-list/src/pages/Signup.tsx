import React from 'react'
import { useEffect, useState } from "react"
import { Link,useNavigate } from 'react-router-dom';
function Signup() {
    const navigate = useNavigate();
    const [values,setValues] = useState({
        username:"",
        email:"",
        password:"",
    })
    const handleChange = (event)=>{
        setValues({ ...values,[event.target.name] : event.target.value})
    }
    const handleSubmit = async(event)=>{
        event.preventDefault();
        
        if(values.username && values.password && values.email){
            if(!localStorage.getItem(values.username)){
                localStorage.setItem(values.username,JSON.stringify(values))
                navigate('/signin')
            }else{
                alert('user already registered')
            }
            
        }else{
            alert("incomplete")
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
        <label htmlFor="item">Email</label>
        <input
          type="email"
          id="email"
          name="email"
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
      <button className="btn">Sign up</button>
      <span>already have an account?<Link to="/signin"> SIGN IN</Link></span>
    </form>
    </div>
  )
}

export default Signup
