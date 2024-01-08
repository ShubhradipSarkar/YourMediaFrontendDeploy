// src/components/ApiButton.js
import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';

const AcceptButton = ({deleteRequest, friendId, message}) => {
  const [selfId, setSelfId] = useState('');
  const [errMsg, setErrMsg] = useState('Confirm Friend Request');
//   const [friendId, setFriendId] = useState('');
  const myId=localStorage.getItem('userId');
  //console.log('myid = '+myId);
  const SuccessMsg=message;
  console.log('delete delete delete = '+deleteRequest);
  console.log('the msg = '+SuccessMsg);
  console.log(errMsg);
  const handleApiCall = async () => {
    
    try {
        if (!friendId) {
            setErrMsg('Could not add as friend'); // If friendId is null, set the error message to 'lol'
            return; // Return early and do not make the API call
          }
      const response = await axios.post('http://127.0.0.1:8000/api/v1/Friends/', {
        self_id: friendId,
        friend_id: myId,
      });
      console.log('try success')
      //console.log(friendRequest.data);
      console.log(response.data); // Handle the API response as needed
      console.log(SuccessMsg);
      setErrMsg(SuccessMsg)


      setTimeout(() => {
        console.log("Delayed action executed after 3 seconds");
      }, 3000); // 3000 milliseconds = 3 seconds

    //   console.log('deleted = '+deleteRequest);
      console.log('delete id = '+deleteRequest)
      await axios.delete(`http://127.0.0.1:8000/api/v1/friendRequest/${deleteRequest}/`);

    } catch (error) {
      console.error(error);
      setErrMsg('Could not add as friend')
    }

    setTimeout(() => {
        console.log("Delayed action executed after 3 seconds");
      }, 3000);
    window.location.reload();

    
  };

  return (
    <div>
      
      <Button onClick={handleApiCall} >{errMsg}</Button>
      <div className={errMsg === 'Friend Request Confirmed' ? 'green-success' : 'red-error'}>{errMsg}</div>
      
    </div>
  );
};

export default AcceptButton;
