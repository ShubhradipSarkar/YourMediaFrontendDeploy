import { useState,useEffect } from 'react';
import axios from 'axios';
import React from "react"
import Navbar1 from "./Navbar"

let filteredData

function Locals(){
    const [id, setId] = useState('');
    const [responseData, setResponseData] = useState([]);

    

    const handleSubmit = (event) => {
        event.preventDefault();
        const apiUrl = `http://127.0.0.1:8000/api/v1/Friends/`; // Replace 'your-api-url' with the actual API endpoint
        // `http://127.0.0.1:8000/api/v1/Friends/${id}`;
        axios.get(apiUrl)
        .then(response => {
            setResponseData(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    
    console.log(responseData)
    const handleInputChange = (event) => {
        setId(event.target.value);
    };
    console.log(id)

    filteredData = responseData.filter(obj => obj.self_id === parseInt(id)).map(obj=>obj.friend_id);

    console.log('filtered')
    console.log(filteredData)
    

    //console.log(friends_of_query_id)
    const [ramAgesData, setRamAgesData] = useState([]);
    useEffect(() => {
        const friends_of_query_id = responseData
    .filter(obj => obj.self_id === parseInt(id))
    .map(obj => obj.friend_id);

    
    
        // Function to call the API for each age and get data
        const fetchRamAgesData = async () => {
          try {
            const promises = filteredData.map(async age => {
                console.log('age = ')
                console.log(age)
                console.log(`http://127.0.0.1:8000/api/v1/Userss/${age}`)
                //console.log(`http://127.0.0.1:8000/api/v1/Userss/${dogId}/`)
              const response = await axios.get(`http://127.0.0.1:8000/api/v1/Userss/${age}`);
              return response.data;
            });
    
            const data = await Promise.all(promises);
            setRamAgesData(data);
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchRamAgesData();
      }, []);
    
   
    return(
        <div>
            <Navbar1/>
            This is the Friends
            <form onSubmit={handleSubmit}>
                <input type="text" value={id} onChange={handleInputChange} placeholder="Enter ID" />
                <button type="submit">Submit</button>
            </form>

            <h4>Friend IDs:</h4>
      <ul>
        {/* {responseData.map((friendId, index) => (
          //<li key={index}>{friendId.friend_id} is friend of {friendId.self_id}</li>
          
        ))} */}
        {/* <pre>{JSON.stringify(filteredData, null, 2)}</pre> */}
        {console.log('this')}
        {console.log(ramAgesData)}
        {ramAgesData.map((ageData, index) => (
          <li key={index}>Age: {ageData.user_name}, Name: {ageData.about}</li>
        ))}
      
      </ul>
    
        </div>
    )
}
export default filteredData