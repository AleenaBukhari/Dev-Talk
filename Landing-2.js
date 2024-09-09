import React, { useEffect,useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'


export const Landing = ({user}) => {
  const [channels, setChannels] = useState([])
  const navigate=useNavigate();

  const divStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    
    height: '74vh', // Set height of the div to full viewport height
  };
  const messageStyle = {
    textAlign: 'center',
  };
  const channelListStyle = {
    color: '#000',
    textDecoration: 'none',
    background: '#333', // Dark grey background color
    padding: '20px',
    borderRadius: '8px',
    width: '300px', // Adjust width as needed
  };

  const channelItemStyle = {
    color: '#000', // Black text color
    background: '#fff', // White background color
    margin: '5px 0',
    padding: '10px',
    borderRadius: '4px',
  };
  const buttonStyle = {
    borderRadius: '20px', // Adjust the border radius to make it more rounded
    background: 'blue', // Change to your desired blue color
    color: 'white', // White text color
    fontWeight: 'bold', // Make text bold
    padding: '10px 20px', // Adjust padding as needed
    border: 'none', // Remove default button border if desired
  };


  useEffect(()=>{
  getChannels()

  },[navigate])


  const getChannels =()=>{
    axios
    .get('http://localhost:8080/channels')
    .then(res => {
        setChannels(res.data)
    })
    .catch((err) => console.log(err));
  }


  const handleSubmit=(event)=>{
    event.preventDefault()
    console.log(user)
    const channel_name = event.target.channel_name.value.trim()
    const creator_id = user.id 
     
    axios
    .post('http://localhost:8080/channels',{channel_name,creator_id})
    .then(res => {
        getChannels()
    })
    .catch((err) => console.log(err));
  }

  const handleChannelClick = (channelId) => {
    navigate(`/channels/${channelId}`);
  };



  return (

    <div style={divStyle}>
      <div style={messageStyle}>
       <form onSubmit={handleSubmit} >
        <h3> Create New Channel</h3>
        <input type='text' placeholder='Channel Name' name='channel_name'/>
        <br /> <br /> 
        <button type='submit' style={buttonStyle}>Create Channel</button>
       </form>
       <br /> <br />
        <h4>Channels List</h4>
        <div className='channels' style={channelListStyle}>
            {
                channels.map((channel)=>{
                return <div key={channel.id } style={channelItemStyle} onClick={() => handleChannelClick(channel.id)}>
               
                  <Link to={`/channels/${channel.id}`} style={{ textDecoration: 'none', color: '#000' }}>
                  {channel.channel_name}
                </Link>
                </div>
                })
            }

        </div>
       
      </div>
    </div>
  );
};