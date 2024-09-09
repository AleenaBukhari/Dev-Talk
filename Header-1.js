import React, {useState,useEffect, useRef} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'

export default function Header({ user }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const searchRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.replace('/login');
  };

  const headerStyle = {
    backgroundColor: '#333',
    padding: '20px 0',
    color: 'white',
    textAlign: 'center',
    marginBottom: '20px',
   
  };
  const searchContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  };
  const searchInputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
    width: '300px',
  };
  const searchButtonStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  };

  const searchresultStyle = {
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center',
    width: '400px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  };


  const navLinkStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: 'blue',
    color: 'white',
    textDecoration: 'none',
    marginRight: '10px',
  };

  const logoutButtonStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: 'blue',
    color: 'white',
    textDecoration: 'none',
  };
  const handleSearch = () => {
    axios.get(`http://localhost:8080/search/${searchQuery}`)
        .then((res) => {
            setSearchResults(res.data);
            setShowSearchResults(true);
            // Handle and display search results in your UI
            console.log(res.data); // Update this part with your UI logic
        })
        .catch((err) => console.error(err));
};
useEffect(() => {
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearchResults(false);
    }
  };

  window.addEventListener('click', handleClickOutside);

  return () => {
    window.removeEventListener('click', handleClickOutside);
  };
}, []);
const handleContainerClick = (event) => {
  event.stopPropagation(); // Stop propagation to prevent closing when clicking inside the search results
};



  return (
    <header style={headerStyle}>
      <h1>DevTalk</h1>
      <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={searchInputStyle}
            />
            <button onClick={handleSearch} style={searchButtonStyle}>Search</button>
            {/* Display search results here */}
            <div>
                { showSearchResults && searchResults.length > 0 ? (
                    <div style={searchresultStyle} ref={searchRef} onClick={handleContainerClick}>
                        <h2>Search Results</h2>
                        <ul>
                            {searchResults.map((result) => (
                                 <NavLink key={result.id} to={`/posts/${result.id}`} style={{ textDecoration: 'none' }}>
                                 <li>
                                     {result.content}
                                 </li>
                             </NavLink>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p></p>
                )}
            </div>
      <nav>
        <NavLink to='/landing' style={navLinkStyle}>Channels</NavLink>
        <NavLink to='/' style={navLinkStyle}>Home</NavLink>
        {
          user?.id ? (
            <button style={logoutButtonStyle} onClick={logout}>Logout</button>
          ) : (
            <NavLink to='/signup' style={navLinkStyle}>Login</NavLink>
          )
        }
      </nav>
    </header>
  );
}
