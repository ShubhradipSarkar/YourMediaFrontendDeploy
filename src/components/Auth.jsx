import React from 'react'
import { useState } from 'react'
import Navbar1 from './Navbar'
import axios from 'axios';

function Auth(){
    
    const [name, SetName]=useState('');
    const [about, SetAbout]=useState('');
    const [lat, SetLat]=useState('');
    const [log, SetLog]=useState('');
    const [status, setStatus]=useState('');
    const [password, SetPassword]=useState('');

    const handleApiCall = async () => {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/v1/Userss/', {
            user_name:name,
            about:about,
            password:password,
            latitude:lat,
            longitude:log,

          });
          setStatus('Welcome :)');
          console.log(response.data); // Handle the API response as needed
        } catch (error) {
          console.error(error);
          setStatus('Oops :( there was a problem registering you try again ');
        }
    };

    return(
        <div>
            <Navbar1/>
            <center><h3>Register</h3></center>

            <center>
                <div className='loginform'>
                    <input type="text" placeholder='Name' value={name} onChange={(e) => SetName(e.target.value)}/>
                    <input type="text" placeholder='About' value={about} onChange={(e) => SetAbout(e.target.value)}/>
                    <input type="text" placeholder='Password' value={password} onChange={(e) => SetPassword(e.target.value)}/>
                    <input type="text" placeholder='Lattitude' name="" id="" value={lat} onChange={(e) => SetLat(e.target.value)}/>
                    <input type="text" placeholder='Longtitude' value={log} onChange={(e) => SetLog(e.target.value)}/>
                    <center><button onClick={handleApiCall}>Register</button></center>
                    <a href="login">Login</a>
                    <p>{status}</p>
                </div>
                
            </center>
            
            
        </div>
    )
}

export default Auth