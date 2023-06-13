
import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Link, Routes } from "react-router-dom"
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/landing/Login';
import Register from './pages/register/Register';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register'element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
