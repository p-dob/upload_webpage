/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_SUGGESTIONS_API, YOUTUBE_VIDEO_SEARCH_RESULTS } from '../utils/constants';
import {v4 as uuid} from 'uuid';
import { cacheResults } from '../utils/suggestionsSlice';
import { setSearchVideos } from '../utils/searchSlice';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {

  const [searchValue,setSearchValue] = useState('');
  const [searchResults,setSearchResults]= useState([]);
  const [showResults, setShowResults] = useState(false);
  const dispatch = useDispatch();
  const suggestions = useSelector(store=>store.suggestions);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleMenu=()=>{
    dispatch(toggleMenu());
  };

  useEffect(()=>{
    const timer = setTimeout(()=>{

      //searching for suggestions
      if(suggestions[searchValue]){
        setSearchResults(suggestions[searchValue]);
      }
      
      else{
        getSearchSuggestions();
      }
      
    },200);
    
    //Cleanup Code
    return()=>{
      clearTimeout(timer);
    }
  },[searchValue]);


  const getSearchSuggestions=async()=>{
    
    // console.log('API Call- '+searchValue);
    const result = await fetch(YOUTUBE_SEARCH_SUGGESTIONS_API + searchValue);
    const json = await result.json();
    
    setSearchResults(json[1]);
    //caching  
    dispatch(cacheResults({
      [searchValue]:json[1]
    }))
  }

  const handleBlur=(e)=>{
    if(!e.currentTarget.contains(e.relatedTarget)){
      setShowResults(false);
    }
  }
  const handleSearch= async ()=>{
    const vidRes = await fetch (YOUTUBE_VIDEO_SEARCH_RESULTS+ searchValue );
    const vidJson = await vidRes.json();
    dispatch(setSearchVideos(vidJson.items));

    //Navigate to results page
    navigate(`/results`);
    // blur the suggestions
    setShowResults(false);
  }

  const handleSuggestionClick=(e)=>{
    setSearchValue(e.target.textContent);
    handleSearch();
  }

  return (
    <div className='grid grid-flow-col m-2 p-3 shadow-lg'>
        <div className='flex col-span-1'>
            <img onClick={()=>handleMenu()} className='h-4 mt-2 mx-2 cursor-pointer' alt='hamburger' src='https://cdn-icons-png.flaticon.com/512/3917/3917215.png'/>
            <Link to='/'>
              <img className='h-7 mx-2' alt='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png'/>
            </Link>
        </div>
        <form className='col-span-10 mx-80 h-8 flex p-0' onSubmit={(e)=>{
          e.preventDefault();
          handleSearch();
        }} onBlur={(e)=>handleBlur(e)}  tabIndex={1} ref={inputRef}>
            <input className='w-5/6 p-2 px-4 border border-gray-400 rounded-l-full' type='text' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} onFocus={()=>setShowResults(true)} placeholder='Search'/>
            <button className=' w-14  border border-gray-400 rounded-r-full bg-gray-200' ><img className='h-4 pl-4' alt='search-icon' src='https://cdn-icons-png.flaticon.com/512/54/54481.png'/> </button>
            {showResults && (<div className=' mt-8 absolute ml-2 bg-white w-[470px] border border-gray-100 rounded-md shadow-lg' onClick={(e)=> handleSuggestionClick(e)}>
            <ul className='cursor-pointer' >
              {searchResults.map(result=>(<li key={uuid()} className='flex shadow-sm px-2 py-1 hover:bg-gray-200'><img className='h-[10px] mt-2 mx-1' src='https://cdn-icons-png.flaticon.com/512/54/54481.png' alt='search-icon'/>{result}</li>))}
            </ul>
          </div>)}
        </form>
        <div className='flex col-span-1'>
            <img className='h-8' alt='user-icon' src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'/>
        </div>
    </div>
  )
}

export default Header