import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [Email, SetEmail ] = useState('')
    const [Password, SetPassword ] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    
    const SubmitHandler = async (event) => {
        event.preventDefault()
        try{
            const result = await axios.post('http://127.0.0.1:8000/Login',{
                Email: Email,
                Password : Password
            })
            SetEmail('');
            SetPassword('');

            if (result.data.success){
                navigate('/Home');
            }else {
                setErrorMessage('Invalid email or password. Please try again.');
              }

        } catch(error){
            console.log(error)
        }
     }

  return (
    <div>
      <form onSubmit={SubmitHandler}>
        <input type='email' placeholder='Email' value={Email} onChange={(e) => SetEmail(e.target.value)}/>
        <input type='password' placeholder='password' value={Password} onChange={(e) => SetPassword(e.target.value)}/>
        <button type='submit'>submit</button>
      </form>

    </div>
  )
}

export default Login;
