import React from 'react'

const LiveMessage = ({name,text}) => {
  return (
    <div className='flex shadow-md my-1 items-center'>
        <img className='h-6' alt='user-icon' src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'/>
        <div className='ml-1'>
            <span className='font-bold pr-2'>{name}</span>
            <span>{text}</span>
        </div>
    </div>
  )
}

export default LiveMessage