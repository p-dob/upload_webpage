import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'

const MainBody = () => {
  return (
    <div className='w-5/6 h-screen'>
        <ButtonList/>
        <VideoContainer/>
    </div>
  )
}

export default MainBody