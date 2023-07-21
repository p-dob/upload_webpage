import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const isMenuOpen = useSelector(store=>store.app.isMenuOpen);

    //early return
    if(!isMenuOpen) return null;

  return (
    <div className='shadow-lg p-2 w-1/7 flex flex-col overflow-y-scroll h-screen' style={{scrollbarWidth: 'none'}}>
        <ul className='border-b-slate-500 border-b p-4'>
            <li><Link to="/">Home</Link></li>
            <li>Shorts</li>
            <li>Subscriptions</li>
        </ul>
        <ul className='pt-5 border-b-slate-500 border-b p-4'>
            <li>Library</li>
            <li>History</li>
            <li>Your Videos</li>
            <li>Watch Later</li>
            <li>Liked Videos</li>
        </ul>
        <div className='pt-5 border-b-slate-500 border-b p-4'>
            <h1 className='text-l font-bold pb-2'>Subscriptions</h1>
            <ul>
                <li>Akshya Saini</li>
                <li>Ankur Warikoo</li>
                <li>Saket Gokhale</li>
                <li>Eminem</li>
            </ul>
        </div>
        <div className='pt-5 border-b-slate-500 border-b p-4'>
            <h1 className='text-l font-bold pb-2'>Explore</h1>
            <ul>
                <li>Trending</li>
                <li>Shopping</li>
                <li>Music</li>
                <li>Films</li>
                <li>Live</li>
                <li>Gaming</li>
                <li>News</li>
                <li>Sport</li>
            </ul>
        </div>
        <ul className='pt-5 border-b-slate-500 border-b p-4'>
            <li>Settings</li>
            <li>Report history</li>
            <li>Help</li>
            <li>Send feedback</li>
        </ul>
        <div className='pt-5 p-4 text-sm font-bold w-52'>
        <p className='py-2'>About Press Copyright Contact us Creator Advertise Developers</p> 
        <p >Terms Privacy Policy & Safety How YouTube works</p> 
        <p> Test new features </p>
        <p className='py-2'>© 2023 Google LLC</p>
        </div>
    </div>
  )
}

export default Navbar