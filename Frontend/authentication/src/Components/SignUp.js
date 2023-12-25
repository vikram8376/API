import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const SignUp = () => {
    const [Name, SetName ] = useState('')
    const [Email, SetEmail ] = useState('')
    const [Phone_No, SetPhone ] = useState('')
    const [Password, SetPassword ] = useState('')


    const SubmitHandler = async (e) => {
        e.preventDefault()

        try{
           const result = await axios.post('http://127.0.0.1:8000/NewUser',{
            Name,
            Email,
            Phone_No,
            Password,
           })
           SetName('');
           SetEmail('');
           SetPhone('');
           SetPassword('');
        } catch (error){
           console.error(error)
        }
    }

  return (
    <div>
      <form onSubmit={SubmitHandler}>
        <input type='text' placeholder='Name' value={Name} onChange={(e) => SetName(e.target.value)}/>
        <input type='email' placeholder='Email' value={Email} onChange={(e) => SetEmail(e.target.value)}/>
        <input type='number' placeholder='Phone_No' value={Phone_No} onChange={(e) => SetPhone(e.target.value)}/>
        <input type='password' placeholder='password' value={Password} onChange={(e) => SetPassword(e.target.value)}/>
        <button type='submit'>submit</button>
      </form>
      <a href='/Login'>Sign In</a>
    </div>
  )
}

export default SignUp;
