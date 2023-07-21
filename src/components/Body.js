import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Body = () => {
  return (
    <div className='flex h-screen'>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Body;