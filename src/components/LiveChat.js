/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
import LiveMessage from './LiveMessage';
import {v4 as uuid} from 'uuid';
import { generateRandomMessage, generateRandomName } from '../utils/helper';

const LiveChat = () => {

    const dispatch = useDispatch();
    const chat = useSelector(store=>store.chat.messages);

    useEffect(()=>{
        //Use Logic for API polling
        const i = setInterval(()=>{
            dispatch(addMessage({
                name:generateRandomName(),
                text:generateRandomMessage(),
            }))
        },2000);

        //CleanUp code
        return()=>{
            clearInterval(i);
        }
    },[]);

  return (
    <>
        {chat.map(c=><LiveMessage key={uuid()} name={c.name} text={c.text}/>)}
    </>
  )
}

export default LiveChat