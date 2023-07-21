import React from 'react'

const VideoCard = ({info}) => {
    const {snippet,statistics}=info;
    const {thumbnails, title, channelTitle}= snippet;

    return (
    <div className='shadow-lg m-2 w-96 rounded-xl'>
        <img className='rounded-t-xl w-full h-52 object-cover' alt='thumbnail' src={thumbnails?.high?.url}/>
        <ul className='px-2'>
            <li className='font-bold my-2 truncate'>{title}</li>
            <li>{channelTitle}</li>
            <li>{statistics?.viewCount} Views</li>
        </ul>
    </div>
  )
}

export default VideoCard