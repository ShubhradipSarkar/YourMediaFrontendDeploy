import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios.get('https://yourmedia.onrender.com/api/v1/Friends/')
      .then(res => {
        setDetails(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <header>Data got from Django API</header>
      <hr />
      {details.map((output, id) => (
        <div key={id}>
          <div>
            <h2>{output.self_id} is a friend of {output.friend_id}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
