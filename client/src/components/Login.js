import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
// import { prependOnceListener } from "cluster";



const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosWithAuth()
    .post('api/login', credentials)
    .then(response => {
      console.log(response);
      localStorage.setItem('token', response.data.payload);
      props.history.push('/colors');
    })
    .catch(error => {
      console.log(error);
    })
  }


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>

      <form onSubmit = {handleSubmit}>

      <input 
            type = "text" 
            name = "username" 
            placeholder = "Username" 
            onChange = {handleChange} 
            value = {credentials.username} 
            />

            <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            value={credentials.password} 
            />

            <button >Log In</button>


      </form>
    </>
  );
};

export default Login;
