import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className='w-4/5 m-auto'>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default MainLayout