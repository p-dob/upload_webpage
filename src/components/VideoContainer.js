import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { YOUTUBE_API } from '../utils/constants';
import VideoCard from './VideoCard'

const VideoContainer = () => {
  const [videos,setVideos]=useState([]);

  useEffect(()=>{
    fetchVideos();
  },[]);

  const fetchVideos = async()=>{
    const data= await fetch(YOUTUBE_API);
    const result =await data.json();
    setVideos(result.items);
  }

  return (
    <div className='flex flex-wrap justify-evenly overflow-y-auto h-screen scrollbar-hidden m-2' style={{scrollbarWidth: 'none'}}>
      {videos.map(video=>{
        return(
          <Link to={'/watch?v='+video.id} key={video.id}>
            <VideoCard info={video}/>
          </Link>
        )
      })}
    </div>
  )
}

export default VideoContainer