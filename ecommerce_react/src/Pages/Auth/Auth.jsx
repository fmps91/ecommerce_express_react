import React from 'react'
import './Auth.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Auth = () => {

  const [state, setState] = useState('Sign In');
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: ""
  })
  const navigate = useNavigate();

  const signin = async () => {
    console.log("signin: ", formData)
    try {
      const resp=await axios.post(
                'http://localhost:4000/signin',
                formData
                
            );
            console.log("resp: ",resp.data)
            localStorage.setItem("token",resp.data.token)
           /*  setTimeout(() => { 
              navigate("/")
             }, 2000); */
            navigate("/")
            
    } catch (error) {
      console.log("error: ",error)
    }
    
  }

  const signup = async () => {
    console.log("signup: ", formData)
    try {
      const resp=await axios.post(
                'http://localhost:4000/signup',
                formData
                
            );

            console.log("resp: ",resp.data.token)
            
            /* setTimeout(() => { 
              localStorage.setItem("token",resp.data.token)
             }, 200); */
             localStorage.setItem("token",resp.data.token)
            //alert("User Registered Successfully")
            window.location.replace("/")
    } catch (error) {
      console.log("error: ",error)
    }
    
  }

  const changeHandler = (e) => {
    
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='signinsignup'>
      <div className="signinsignup-container">
        <h1>{state}</h1>
        <div className="signinsignup-fields">
          {state === 'Sign Up' ?
            <input name='name' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />
            :
            <></>
          }
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="passwoord" placeholder='Password' />
        </div>

        <button onClick={() => {
          state === 'Sign In'
            ?
            signin()
            :
            signup()
        }}>Continue</button>


        {state === 'Sign In' ?
          <p className="signinsignup-signin">Already have an account? <span onClick={() => setState("Sign Up")}> Sign Up</span></p>

          :
          <></>
        }

        {state === 'Sign Up' ?
          <p className="signinsignup-signin">Create an account? <span onClick={() => setState("Sign In")}> Click here</span></p>
          :
          <></>
        }
        <div className="signinsignup-agree"><input type="checkbox" />
          <p>By contiuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>


    </div>
  )
}

export default Auth 