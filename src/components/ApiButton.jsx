// src/components/ApiButton.js
import React, { useState } from 'react';
import axios from 'axios';
import './style.css'

const ApiButton = ({friendId, msg}) => {
  const [selfId, setSelfId] = useState('');
  const [errMsg, setErrMsg] = useState('Add as Friend');
//   const [friendId, setFriendId] = useState('');
  const myId=localStorage.getItem('userId');
  console.log('myid = '+myId);


  const handleApiCall = async () => {
    try {
        if (!friendId) {
            setErrMsg(msg); // If friendId is null, set the error message to 'lol'
            return; // Return early and do not make the API call
          }
      const response = await axios.post('https://yourmedia.onrender.com/api/v1/Friends/', {
        self_id: friendId,
        friend_id: myId,
      });
      const friendRequest = await axios.post('https://yourmedia.onrender.com/api/v1/friendRequest/', {
        request_from: myId,
        request_to: friendId,
      });
      console.log(friendRequest.data);
      console.log(response.data); // Handle the API response as needed
      setErrMsg('Friend Request Sent...')
    } catch (error) {
      console.error(error);
      setErrMsg(msg)
    }
  };

  return (
    <div>
      
      <button onClick={handleApiCall} className="acceptbutton">{errMsg}</button>
      <div className={errMsg === 'Friend Request Sent...' ? 'green-success' : 'red-error'}>{errMsg}</div>
      
    </div>
  );
};

export default ApiButton;
