// src/components/DogDetails.js
import React, { useState } from 'react';
import axios from 'axios';
import Navbar1 from './Navbar';
import './style.css';
import ApiButton from './ApiButton';
import SearchComponent from './SearchComponent';
import Profile from './Profile';
const Test = () => {


  // Query friend data collection
  const [id, setId] = useState('');
  const [responseData, setResponseData] = useState([]);
  const [posts, setPosts]=useState([]);
  const [showElements, setShowElements] = useState(false);
  const [FriendName, setFriendName] = useState('');

  const handleShowElements = () => {
    setShowElements(true);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const apiUrl = `https://yourmedia.onrender.com/api/v1/Friends/`; // Replace 'your-api-url' with the actual API endpoint
    
    const apiUrl_posts='https://yourmedia.onrender.com/api/v1/Posts/';

    axios.get(apiUrl)
    .then(response => {
        setResponseData(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    axios.get(apiUrl_posts)
    .then(response => {
        setPosts(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };

  const handleInputChange = (event) => {
        setShowElements(false);
        setId(event.target.value);
    };
    console.log(id)
  
    console.log('posts')
    console.log(posts)
  //filteredData is the friends of id=what is given in input box 
  let filteredData = responseData.filter(obj => obj.self_id === parseInt(id)).map(obj=>obj.friend_id);
  let filteredPosts = posts.filter(obj => obj.self_id === parseInt(id));
  //////////////////////////////
  console.log(filteredData)
  console.log(filteredPosts)

  const [dogsData, setDogData] = useState([]);
  const [dogId, setDogId] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://yourmedia.onrender.com/api/v1/Userss/${id}/`);
      const data = response.data;
      setFriendName(data.user_name);
      console.log('String from API saved in variable item:', data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  // Call the API when the component renders
  fetchData();
  

  const fetchDogData = async () => {
    try {
        const validIds = filteredData.filter(id => id !== null && id !== undefined);
    validIds.map((id) => console.log('id=' + id));

    const responses = await Promise.all(
      validIds.map((id) => axios.get(`https://yourmedia.onrender.com/api/v1/Userss/${id}/`))
    );
  
        const fetchedDogsData = responses.map((response) => response.data);
        setDogData(fetchedDogsData);
        
      } catch (error) {
        console.error(error);
        setDogData([]);
      }
  };

const updateDogData = () => {
    const updatedDogsData = dogsData.map(dog => {
      const urlParts = dog.url.split('/');
      const lastPart = urlParts[urlParts.length - 2];
      const extractedInteger = parseInt(lastPart, 10);
  
      return { ...dog, url: extractedInteger };
    });
  
    setDogData(updatedDogsData);
  };

  

  return (
    <div>
        <Navbar1/>
        <SearchComponent/>
        
      
    </div>
  );
};

export default Test;
