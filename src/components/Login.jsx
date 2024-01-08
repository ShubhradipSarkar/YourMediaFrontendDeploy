import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/esm/Form";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `http://127.0.0.1:8000/api/v1/login`; // Replace 'your-api-url' with the actual API endpoint

    axios
      .post(apiUrl, {
        email: email,
        password: password,
      })

      .then((response) => {
        console.log(response.data);
        navigate('/primaryinfo');
        const userId = response.data.id;
        const userName=response.data.name;
        console.log("current user id = "+ userId)
        // const res=axios.get(`http://127.0.0.1:8000/api/v1/Userss/${userId}/`);
        // console.log('the response:::');
        // console.log(res.data);
        // localStorage.setItem('userName', res.user_name);
      // Store the user ID in localStorage
      localStorage.setItem('userName', userName);
      localStorage.setItem('userId', userId);
      
        //setResponseData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });


      

  
        // Store the user ID in localStorage
        //localStorage.setItem('userId', userId);
  
        // Redirect or perform other actions after successful login
       
  };
  return (
    <div className="loginpage">
      

    <div className='userbox'>
    <Form className='form_primary' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label className='lebel'>Email</Form.Label>
        <Form.Control type="text" placeholder="Enter Registered Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label className='lebel'>Password</Form.Label>
        <Form.Control type="text" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
      
      <center><button type="submit" className='acceptbutton'>Login</button></center>
      {/* <center><p>{succ}</p></center> */}
      
    </Form>
    
    </div>
    <a href="register">Not registered yet? Register here</a>
    </div>
    
  );
};

export default Login;
