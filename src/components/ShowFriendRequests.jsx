import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApiButton from './ApiButton';
import AcceptButton from './AcceptButton';
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import PlaceIcon from "@mui/icons-material/Place";
const RequestEntry = ({id , entry }) => {
  const [data, setData] = useState(null);
  const navigate=useNavigate();
    console.log('key = '+id);
  useEffect(() => {
    fetchAdditionalData();
  }, []);
  const showDetail = (value) => {
    localStorage.setItem('viewProfile', value);
    const data=localStorage.getItem('viewProfile');
    console.log('Clicked with value:', data);
    navigate('/profile');
    window.location.reload();
  };
  const fetchAdditionalData = () => {
    axios.get(`http://127.0.0.1:8000/api/v1/Userss/${entry.request_from}/`)
      .then(response => {
        console.log(`http://127.0.0.1:8000/api/v1/Userss/${entry.request_from}/`);
        setData(response.data);
      })
      .catch(error => {
        console.error('GET error:', error);
      });
  };

  const message="Friend Request Confirmed";
  return (
    <div className='people'>
      {data && (
        <div>
            <div onClick={() => showDetail(data.digit)}>
            <h4>{data.user_name}</h4>
            <h5>{data.about}</h5>
            <p> <SchoolIcon color="primary" fontSize='medium'/> {data.college}</p>
            <p><PlaceIcon color="secondary" fontSize='medium'/> {data.city}</p>
            </div>
          
          {/* Add more fields here */}

          
          <AcceptButton deleteRequest={id} friendId={entry.request_from} message={message}/>
        </div>
      )}
    </div>
  );
};

export default RequestEntry;
