// src/components/ApiButton.js
import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
const ApiButton = ({friendId,text}) => {
  const [selfId, setSelfId] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [status, setStatus] = useState('');
  const myId=localStorage.getItem('userId');
  const name=localStorage.getItem('userName');

  const handleApiCall = async () => {
    try {
      const response = await axios.post('https://yourmedia.onrender.com/api/v1/Posts/', {
        self_id: myId,
        quote: thoughts,
        name: name,
      });
      setStatus('Posted successfully');
      console.log(response.data); // Handle the API response as needed
      window.location.reload();
    } catch (error) {
      console.error(error);
      setStatus('Failed to post');
    }
  };

  return (
    <div>
      {/* <input
        type="text"
        placeholder="Self ID"
        value={selfId}
        onChange={(e) => setSelfId(e.target.value)}
      /> */}
      <div className='post'>
      <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        
        <Form.Control type="text" placeholder="Let your friends how you feel today" className="postinput" value={thoughts}
        onChange={(e) => setThoughts(e.target.value)}/>
      </Form.Group>
      </Form>
      <button onClick={handleApiCall} className='acceptbutton'>Post</button>

      {status && <p>{status}</p>}
      </div>
      
    </div>
  );
};

export default ApiButton;
