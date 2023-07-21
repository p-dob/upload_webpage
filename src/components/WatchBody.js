/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom';
import { closeMenu } from '../utils/appSlice';
import { addMessage } from '../utils/chatSlice';
import CommentsList from './CommentsList';
import LiveChat from './LiveChat';

const commentsData = [
  {
    name: "User",
    text:  "In JavaScript, you can use the Object.assign() method to merge two or more objects. The Object.assign() method takes one or more source objects and assigns their properties to a target object.",
    replies:[
      {
        name: "User",
        text:  "In JavaScript, you can use the Object.assign() method to merge two or more objects. The Object.assign() method takes one or more source objects and assigns their properties to a target object.",
        replies:[
          {
            name: "User",
            text:  "In JavaScript, you can use the Object.assign() method to merge two or more objects. The Object.assign() method takes one or more source objects and assigns their properties to a target object.",
            replies:[
              {
                name: "User",
                text:  "In JavaScript, you can use the Object.assign() method to merge two or more objects. The Object.assign() method takes one or more source objects and assigns their properties to a target object.",
                replies:[]
              }
            ]
          }
        ]
      }]},
      {
        name: "User",
        text:  "In JavaScript, you can use the Object.assign() method to merge two or more objects. The Object.assign() method takes one or more source objects and assigns their properties to a target object.",
        replies:[  
          {
            name: "User",
            text:  "In JavaScript, you can use the Object.assign() method to merge two or more objects. The Object.assign() method takes one or more source objects and assigns their properties to a target object.",
            replies:[    
              {
                name: "User",
                text:  "In JavaScript, you can use the Object.assign() method to merge two or more objects. The Object.assign() method takes one or more source objects and assigns their properties to a target object.",
                replies:[    
                ]
              }
            ]
          }  
        ]
      },
      {
        name: "User",
        text:  "In JavaScript, you can use the Object.assign() method to merge two or more objects. The Object.assign() method takes one or more source objects and assigns their properties to a target object.",
        replies:[    
        ]
      }
];

const WatchBody = () => {

    const [chat, setChat] = useState('');
    const [searchParams]= useSearchParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(closeMenu());
    },[])

    const sendChat = () =>{
      dispatch(addMessage({
        name: "YOU",
        text : chat,
      }))
      setChat('');
    };

  return (
    <div className='ml-5 mt-2 w-6/7'>
      <div className='flex justify-around'>
        <iframe width="1100" height="550" src={"https://www.youtube.com/embed/"+ searchParams.get('v')+ "?autoplay=1"} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen autoPlay></iframe>
        <div className='flex flex-col ml-2 p-2 border border-black rounded-md  bg-slate-100'>
          <h1 className='text-lg font-bold mb-1'>Live Chat</h1>
          <div className='h-[450px] overflow-y-scroll flex flex-col-reverse'>
            <LiveChat/>
          </div>
          <form className='m-2 flex' onSubmit ={(e)=>{
            e.preventDefault();
            sendChat();
          }}> 
            <input type='text' placeholder='Type Your Chat' className='border border-gray-400 p-1 w-4/5' value={chat} onChange={(e)=>setChat(e.target.value)}/>
            <button className='bg-green-400 mx-1 p-2 px-4 rounded-md'>Send</button>
          </form>
        </div>
      </div>
      <div className='m-2 p-2 w-3/4'>
        <h1 className='font-bold text-xl mb-4'>Comments:</h1>
        <CommentsList comments={commentsData}/>
      </div>
    </div>
  )
}

export default WatchBody