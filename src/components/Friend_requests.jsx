import { useEffect, useState } from "react";
import React from "react"
import Navbar1 from "./Navbar"
import axios from "axios";
import RequestEntry from "./ShowFriendRequests";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function Friend_requests(){
  
    const userId = localStorage.getItem('userId');
    const [details, setDetails] = useState([]);
    const [status, SetStatus]=useState('No more friend requests for now...');
  
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/v1/SearchView/${userId}/`)
          .then(res => {
            console.log(res.data);
            setDetails(res.data);
          })
          .catch(err => {
            console.error(err);
          });

        //fetchAdditionalData();
    }, []);
    if(details.size>0){
      SetStatus('');
    }
    //console.log('ids are = ')
    //console.log(details[0].id);
    return (
      <div>
          <Navbar1/>
          
        {details.map(entry => (
          
          <RequestEntry id={entry.id} entry={entry} />
        ))}

        <h4 className="noreq"><SentimentVeryDissatisfiedIcon color="primary" fontSize="large"/>{status}</h4>
        
      </div>
    );
}

export default Friend_requests