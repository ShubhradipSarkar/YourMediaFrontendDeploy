
import React,{useEffect,useState} from "react"
import Navbar1 from "./Navbar"
import FaceIcon from "@mui/icons-material/Face";
import axios from "axios";
import PostButton from "./PostButton";
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import ThumbDownOffAltTwoToneIcon from '@mui/icons-material/ThumbDownOffAltTwoTone';
import MessageSharpIcon from '@mui/icons-material/MessageSharp';

function Feed(){
    const [id, setId] = useState('');
    const [responseData, setResponseData] = useState([]);
    const [posts, setPosts]=useState([]);
    const [showElements, setShowElements] = useState(false);
    const [FriendName, setFriendName] = useState('');
    const [liker, SetLiker]=useState([]);
    const myId=localStorage.getItem('userId')
    console.log('hur='+myId);
    
    ///////////////////////////
    useEffect(() => {
      // event.preventDefault();
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

      axios.get(`https://yourmedia.onrender.com/api/v1/Likes/?search=${myId}`)
      .then(res=>{
          SetLiker(res.data);
      })
    }, []);
    ///////////////////////////
    // const handleSubmit = (event) => {
      
    // };
    const like=async(parameter)=>{
      
      const urlSegments = parameter.split("/");
      const primaryKey = urlSegments[urlSegments.length - 2];
      console.log('post id = ', primaryKey);

      try{
        const response = await axios.post("https://yourmedia.onrender.com/api/v1/Likes/",{
        "post_id":primaryKey,
        "liker_id":myId,
      }).then(console.log('liked'));
      }
      catch(error){
        //console.log(error);
      }
      
    };
    const handleInputChange = (event) => {
        setShowElements(false);
        id=myId;
        setId(myId);
    };
    console.log("id is = "+id)
    let filteredData = responseData.filter(obj => obj.self_id === parseInt(myId)).map(obj=>obj.friend_id);
    
    const FriendSet=new Set();

    for(const element of filteredData){
      FriendSet.add(element);
      
    }
    FriendSet.add(parseInt(myId));
    console.log(FriendSet)
    const filteredPosts = [];

    for (let i = posts.length - 1; i >= 0; i--) {
      const entry = posts[i];
      if (FriendSet.has(entry.self_id)) {
        filteredPosts.push(entry);
      }
    }

    //console.log(filteredPosts)
    const myMap = new Map();

    const callApiAndExtractName = async (key) => {
      try {
        if (!key){
          return;
        }
        const response = await axios.get(`https://yourmedia.onrender.com/api/v1/Userss/${key}/`);
        const data = response.data;
        //setFriendName(data.user_name);
        const name=data.user_name
        console.log(data.user_name)
        myMap.set(key, name);
        //console.log('String from API saved in variable item:', data);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };
    // Function to call the API for each key in the set
    async function processKeys() {
      try {
        // Use Promise.all to wait for all API calls to finish
        await Promise.all([...FriendSet].map(key => callApiAndExtractName(key)));

        // All API calls are completed, and the data is inserted into the map
        console.log(myMap);
      } catch (error) {
        console.error('Error processing keys:', error.message);
      }
    }

    
    
    const jsonDataWithAges = filteredPosts.map((entry, index) => {
      const { self_id: classValue, ...rest } = entry;
      console.log('clss = '+classValue)
      const age = myMap.get(classValue);
      console.log('age = '+age)
      return { ...rest, age };
    });

    console.log(jsonDataWithAges)
    
    return(
        <div>
            <Navbar1/>
            {/* <h3>Check current News Feed</h3> */}
            {/* <form onSubmit={handleSubmit}>
                <input type="text" value={id} onChange={handleInputChange} placeholder="Enter ID" />
                <button type="submit">Load his informations</button>
            </form> */}
            
            <form >
                      {/* <input type="text" value={id} onChange={handleInputChange} placeholder="Enter ID to see post" /> */}
                      {/* <button type="submit">Load Posts</button> */}
            </form>
            {/* <button onClick={processKeys}>Process Names</button> */}
            <div className="layout">
              <div className="column fixed">
              <PostButton/>
              </div>
              <div className="column scrollable">
              <div className='postwidth'>
              {jsonDataWithAges.map((jsonDataWithAges) => (
                <div key={jsonDataWithAges.id}>
                    <div className='msgwidth'>

                        <p className="postname"><FaceIcon fontSize="large"/>{jsonDataWithAges.name}</p>
                        
                        <h2>{jsonDataWithAges.quote}</h2>
                        {/* <h2>{jsonDataWithAges.url}</h2> */}
                        <br />
                        <div className="likes">
                          {liker.length}
                          <div className="likes" >
                          <ThumbUpTwoToneIcon onClick={() => like(jsonDataWithAges.url)}/>
                          </div>
                          <div className="likes">
                            <MessageSharpIcon/>
                          </div>
                          </div>
                        

                        {/* <h2>{jsonDataWithAges.name}</h2> */}
                    </div>
                    
                </div>
                
              ))}
            </div>
              </div>
            </div>
            
        </div>
    )
}
export default Feed