import React from 'react'

const comment = ({data}) => {
    const {name, text}= data;
  return (
    <div className='flex m-2 p-2 shadow-md bg-gray-200 rounded-lg'>
        <img className='h-10' alt='user-icon' src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'/>
        <div className='mx-1'>
            <h2 className='font-bold'>{name}</h2>
            <p>{text}</p>
        </div>
    </div>
  )
}

export default comment