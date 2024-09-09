import React, { useEffect,useState } from 'react';
import Login from './Login'
import { Landing } from './Landing';
import {Routes,Route,useNavigate} from 'react-router-dom'
import Signup from './Signup'
import ChannelPage from './ChannelDetail';
import Header from './components/Header';
import PostDetail from './PostDetail';


function App(){
  const [user,setUser] = useState({})
  const navigate=useNavigate();
  useEffect(()=>{
    const storeUser = JSON.parse(localStorage.getItem("user"))
    if (storeUser) {
        setUser(storeUser)
        
    } else {
        navigate('/login')
        
    }

  },[navigate])

  return(
    <div>
      <Header user={user}/>
    <Routes>
       {/* Home page route */}
       <Route path='/' element={<Home />} />
      <Route path = '/login' element ={<Login/>}></Route>
      <Route path = '/signup' element ={<Signup/>}></Route>
      <Route path="/landing" element={<Landing user={user}/>} />
      <Route path='/channels/:id' element ={<ChannelPage user={user}/>} />
      <Route path= '/posts/:id' element ={<PostDetail user ={user}/>}/>
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
    </div>
  )
}
// home page styling
const homeContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50vh',
};

const mainHeading = {
  textAlign: 'center',
  fontSize: '3rem',
  marginBottom: '20px',
};

const subHeading = {
  textAlign: 'center',
  fontSize: '1.5rem',
  marginBottom: '15px',
};

const thirdHeading = {
  textAlign: 'center',
  fontSize: '1rem',
};
const Home = () => {
  return (
    <div style={homeContainer}>
      <h1 style={mainHeading}>Welcome to DevTalk</h1>
      <h2 style={subHeading}>Post your programming questions and respond to others</h2>
      <h3 style={thirdHeading}>Happy Hacking!</h3>
    </div>
  );
};
export default App
