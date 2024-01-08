import React, { useState } from "react";
import Chip from '@mui/material/Chip';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import SchoolIcon from '@mui/icons-material/School';
import ApiButton from './ApiButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaceIcon from '@mui/icons-material/Place';
import FaceIcon from "@mui/icons-material/Face";
import showDetail from './SearchComponent'
import Button from "react-bootstrap/esm/Button";


function Profile(){
    
    const [results, setResults] = useState([]);
    const [data, SetData]=useState([]);
    const [friends, SetFriends]=useState([]);
    const navigate=useNavigate();
    const ProfileId=localStorage.getItem('viewProfile');
    
    const [responses, setResponses]=useState([]);
    
    const [buttonClicked, setButtonClicked] = useState(false);
    
    const [flattenedData, setFlattenedData] = useState([]);
    // const navigate=useNavigate();
    

    //console.log(ProfileId);
    function handleClick(){
        navigate('/test')
    }
    const showDetail = (value) => {
        localStorage.setItem('viewProfile', value);
        const data=localStorage.getItem('viewProfile');
        console.log('Clicked with value:', data);
        navigate('/profile');
        window.location.reload();
      };
    const load_friends=async()=>{
        setButtonClicked(true);
        console.log("pressed");
        console.log(friends)
        for (const id of friends) {
            console.log('holulu = ', id.friend_id);
            try {
              const response = await axios.get(`http://127.0.0.1:8000/api/v1/Userss/?search=${id.friend_id}`);
              //console.log(`http://127.0.0.1:8000/api/v1/Userss/?search=${id.friend_id}`);
              //const data=await response.json;
              //setResponses(response.data);
              responses.push(response.data);
              console.log(response.data);
            } catch (error) {
              console.error(`Error fetching data for ID ${id}:`, error);
            }
          }
          const extractedNames = responses.flatMap(innerArray =>
            innerArray.map(item => ({ digit: item.digit, name: item.user_name ,city:item.city}))
          );

          setFlattenedData(extractedNames);
          
    }
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/v1/Userss/${ProfileId}/`)
        .then(res => {
            SetData(res.data);
          })
          .catch(err => {
            //console.error(err);
          });
        
        //const name=localStorage.getItem('userName');
        //console.log('profileid = ',ProfileId)
        axios.get(`http://127.0.0.1:8000/api/v1/Posts/?search=${ProfileId}`)
        .then(res=>{
            
            setResults(res.data);
        })
        .catch(err=>{
            //console.log(err);
        });

        axios.get(`http://127.0.0.1:8000/api/v1/Friends/?search=${ProfileId}`)
        .then(res=>{
            
            SetFriends(res.data);
        })
        .catch(err=>{
            console.log(err);
        });
        
        

        
          
    },[]);
  

    return(
        <div>
            
            
            <Chip
                label="Go back"
                onClick={handleClick}
                onDelete={handleClick}
                />
                <div className="layout">
                <div className="column fixed">{data.user_name}'s User Profile
                    <h2>{data.user_name}</h2>
                    <h4>{data.about}</h4>
                    <p><PlaceIcon color="primary" fontSize='medium' />{data.city}</p>
                    <p><SchoolIcon color="primary" fontSize='medium'/>{data.college}</p>
                    <p><FavoriteIcon color="secondary" fontSize='medium'/>{data.rltn}</p> 
                
                </div>
                <div className="column scrollable">{data.user_name}'s Posts
                {results.map((output, id) => (
                    <div key={id} className='people' >
                    <div>
                    <div className='msgwidth'>

                        <p className="postname"><FaceIcon fontSize="large"/>{output.name}</p>

                        <h2>{output.quote}</h2>

                        {/* <h2>{jsonDataWithAges.name}</h2> */}
                        </div>
                    </div>
                    
                    
                    </div>
                ))}
                
                </div>
                
                <div className="column fixed">{data.user_name}'s Friends

                <Button onClick={load_friends}>See {data.user_name}'s Friends</Button>
                {buttonClicked && (
                    <div>
                        {flattenedData.map((output, id) => (
                            <div key={id} className='people' >
                            <div className='clickable-div' onClick={() => showDetail(output.digit)}>
                                <h2>{output.name}</h2>
                                <h4>{output.city}</h4>
                                
                            </div>
                            
                            <ApiButton friendId={output.digit} msg={"Friends already"}/>
                            </div>
                        ))}
                    </div>
                )}
                
                </div>
                </div>
        </div>
    )
}

export default Profile;