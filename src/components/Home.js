// Import the react JS packages
import {useEffect, useState} from "react";
import axios from "axios";
// Define the Login function.
export const Home = () => {
     const [message, setMessage] = useState('');
     useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/'
        }
        else{
         (async () => {
           try {
             const {data} = await axios.get(   
                            'https://yourmedia.onrender.com/home/', {
                             headers: {
                                'Content-Type': 'application/json'
                             }}
                           );
             setMessage(data.message);
          } catch (e) {
            console.log('not auth')
          }
         })()};
     }, []);
     return 
        <div className="form-signin mt-5 text-center">
          <h3>Hi {message}</h3>
        </div>
}