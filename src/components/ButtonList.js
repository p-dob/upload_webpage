import React, { useRef } from 'react';
import Button from './Button';
import {v4 as uuid} from 'uuid';

const ButtonList = () => {

  const buttons = ['All','Fitness','Investing','Gaming','Comedy','Music','Football','Cricket','Motivation','News','Wickets','Balls','Gadgets','Naruto','Rituals','Gojo','Goku','Itachi','Vegita','Dragon'];
  const containerRef = useRef(null);

  const scroll = (scrollOffset) => {
    containerRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className='mx-6 flex'>
      <button className='py-2 px-4 bg-gray-100 rounded-md mr-2' onClick={() => scroll(-200)}>
        {'<'}
      </button>
      <div className='flex overflow-x-auto' ref={containerRef}>
        {buttons.map(name=><Button key ={uuid()} name={name}/>)}
      </div>
      <button className='py-2 px-4 bg-gray-100 rounded-md ml-2' onClick={() => scroll(200)}>
        {'>'}
      </button>
    </div>
  )
}

export default ButtonList;