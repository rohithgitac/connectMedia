
import { useContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Navigate, Routes } from "react-router-dom"
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/landing/Login';
import Register from './pages/register/Register';
import Loading from './components/loading/Loading';
import { AuthContext } from './context/AuthContext';
function App() {
  const {state} = useContext(AuthContext)
  const{user} = state.state1
  const{post} = state.state2
  const {allTimelinePost} = state.stateTimeline
  const [loading,setLoading] = useState(true)
   
  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])
  

  return (

    <>
    {loading ? <Loading/>
     :
    <Router>
      <Routes>
        <Route path='/' element={user?<Home/> : <Navigate to='/login'/>}></Route>
        <Route path='/register'element={<Register/>}></Route>
        <Route path='/login' element={user ? <Navigate to='/'/>: <Login/>}></Route>
        <Route path='/profile' exact element={user ?<Profile/>:<Navigate to='/login'/>}></Route>
        <Route path='/profile/:friendId' exact element={user ?<Profile others={true}/>:<Navigate to='/login'/>}></Route>
        <Route path='/loading' element={<Loading/>}></Route>
      </Routes>
    </Router>
    }
    </>
  );
}

export default App;
