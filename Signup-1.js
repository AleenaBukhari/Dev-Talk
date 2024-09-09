import React, { useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
//import { validation} from './Login_validation'
import axios from 'axios'


function Signup(){
    const [values, setValues]= useState({
    email : '',
    password: '',
    name: ''
})
const navigate=useNavigate();
const [errors] =useState({})

const handleInput=(event) => {
    setValues(prev =>({...prev,[event.target.name]: [event.target.value]}))
}
const handleSubmit = (event) => {
    event.preventDefault();
      axios
        .post('http://localhost:8080/signup', values)
        .then(res => {
            navigate('/login');
        })
        .catch((err) => console.log(err));
    
  };
    return(
        <div className = 'd-flex justify-content-center align-items-center bg-dark grey vh-100'>
        <div className = 'bg-white p-3 rounded w-25'>
            <h2>Sign-up</h2>

            <form action ="" onSubmit={handleSubmit}>
                <div className = 'mb-3'>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type ="email" placeholder = 'Enter Email' name ='email'
                      onChange ={handleInput} className='form-control rounded-0'/>
                        {errors.email && <span className ='text-danger'>{errors.email}</span>}
                </div>
                <div className = 'mb-3'>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type = "password" placeholder = 'Enter Password' name = 'password'
                      onChange ={handleInput} className ='form-control rounded-0'/>
                       {errors.password && <span className ='text-danger'>{errors.password}</span>}
                </div>
                <div className = 'mb-3'>
                    <label htmlFor="name"><strong>Name</strong></label>
                    <input type = "name" placeholder = 'Display name' name = 'name'
                      onChange ={handleInput}className ='form-control rounded-0'/>
                     {errors.name && <span className ='text-danger'>{errors.name}</span>}
                </div>
                <button type ='submit' className = 'btn btn-success w-100 rounded-0'>Sign Up</button>
                <p>You agree to our terms and conditions</p>
                <Link to ="/" className = 'btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
            </form>
        </div>
    </div>
    )
}
export default Signup