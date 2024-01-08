import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar1 from './Navbar';
import './style.css';
import Button from 'react-bootstrap/esm/Button';
import SchoolIcon from '@mui/icons-material/School';
import ApiButton from './ApiButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceIcon from '@mui/icons-material/Place';
import { style } from '@mui/system';
import { useNavigate } from 'react-router-dom';

function Locals() {
  const userId = localStorage.getItem('userId');
  const [details, setDetails] = useState([]);
  const navigate=useNavigate();

  function func(){
    console.log('div clicked');
  }
  const showDetail = (value) => {
    localStorage.setItem('viewProfile', value);
    const data=localStorage.getItem('viewProfile');
    console.log('Clicked with value:', data);
    navigate('/profile');
  };
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/Userss/')
      .then(res => {
        setDetails(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  //console.log(details[0]);
  return (
    <div>
        <Navbar1/>
      {/* <p>your user id/self id = {userId}</p> */}
      
      <div className='item-container'>
      {details.map((output, id) => (
        <div key={id} className='people'  >
          <div onClick={() => showDetail(output.digit)}>
            <h2>{output.user_name}</h2>
            <h4>{output.about}</h4>
            <p><PlaceIcon color="primary" fontSize='medium' /> {output.city}</p>
            <p><SchoolIcon color="primary" fontSize='medium'/> {output.college}</p>
            <p><FavoriteIcon color="secondary" fontSize='medium'/> {output.rltn}</p> 
            {/* <h4>{output.digit}</h4> */}
          </div>
          
          <ApiButton friendId={output.digit} msg={"Friends already"}/>
        </div>
      ))}
      </div>
      
    </div>
  );
}

export default Locals;
