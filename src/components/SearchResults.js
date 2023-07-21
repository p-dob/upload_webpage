import React from 'react'
import { useSelector } from 'react-redux'
import SearchResultCard from './SearchResultCard';
import { Link } from 'react-router-dom';

const SearchResults = () => {
    const videoList = useSelector((store)=>store.searchResults);
    // console.log(videoList);
  return (
    <div className='m-10 mx-44'>
        { videoList.map(video=>{
            return(
              <Link to={'/watch?v='+video.id.videoId} key = {video.id.videoId}>
                <SearchResultCard data = {video}/>
              </Link>
            )
        })}
    </div>
  )
}

export default SearchResults