import React from 'react'

const SearchResultCard = ({data}) => {
    const {snippet} = data;
    const {channelTitle, description, thumbnails, title}= snippet;
  return (
    <div className='flex h-48 m-4'>
        <img className='rounded-lg' src={thumbnails.medium.url} alt='thumbnail'/>
        <div className='mx-3'>
        <h1 className='font-bold text-lg'>{title}</h1>
        <h2 className='text-sm my-3'>{channelTitle}</h2>
        <h2 className='text-sm'>{description}</h2>
        </div>
    </div>
  )
}

export default SearchResultCard