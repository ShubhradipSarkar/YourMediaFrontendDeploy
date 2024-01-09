import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/esm/Form';
const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `https://yourmedia.onrender.com/api/v1/register`; // Replace 'your-api-url' with the actual API endpoint
      
      
    axios.post(apiUrl, {
        name:name,
        email:email,
        password:password,
      })
      
      .then(response => {
        navigate('/');
          //setResponseData(response.data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
    }
  return (
    

<div className="loginpage">
      

<div className='userbox'>
<Form className='form_primary' onSubmit={handleSubmit}>
<Form.Group className="mb-3" controlId="formGroupPassword">
    <Form.Label className='lebel'>Name</Form.Label>
    <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)}/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formGroupEmail">
    <Form.Label className='lebel'>Email</Form.Label>
    <Form.Control type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formGroupPassword">
    <Form.Label className='lebel'>Password</Form.Label>
    <Form.Control type="text" placeholder="Enter New Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
  </Form.Group>
  
  
  <center><button type="submit" className='acceptbutton'>Register</button></center>
  {/* <center><p>{succ}</p></center> */}
  
</Form>

</div>
<a href="register">Already have an account? Log in here</a>
</div>
  );
};

export default Register;
