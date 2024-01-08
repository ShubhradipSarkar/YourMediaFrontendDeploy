import React, { useState , useEffect} from 'react';
import axios from 'axios';
import ApiButton from './ApiButton';
import { useNavigate } from 'react-router-dom';
const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const showDetail = (value) => {
    localStorage.setItem('viewProfile', value);
    const data=localStorage.getItem('viewProfile');
    console.log('Clicked with value:', data);
    navigate('/profile');
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/Userss/?search=${query}`);
      console.log(`http://127.0.0.1:8000/api/v1/Userss/?search=${query}`)
      console.log(response.data);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name..."
        className='searchbar'
      />
      <button onClick={handleSearch} className='acceptbutton1'>Search</button>

      <ul>
        
        {results.map((output, id) => (
        <div key={id} className='people' >
          <div className='clickable-div' onClick={() => showDetail(output.digit)}>
            <h2>{output.user_name}</h2>
            <h4>{output.about}</h4>
            <h4>{output.city}</h4>
            <h4>{output.college}</h4>
            <h4>{output.rltn}</h4>
            {/* <h4>{output.digit}</h4> */}
          </div>
          
          <ApiButton friendId={output.digit} msg={"Friends already"}/>
        </div>
      ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
