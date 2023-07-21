import React from 'react'

const Button = ({name}) => {
  return (
    <button className='m-2 h-11 px-3 py-1 bg-gray-200 rounded-2xl'>{name}</button>
  )
}

export default Button