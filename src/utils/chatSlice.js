import { createSlice } from "@reduxjs/toolkit";
import { CHAT_COUNT } from "./constants";

const chatSlice = createSlice({
    name:"chat",
    initialState:{
        messages:[],
    },
    reducers:{
        addMessage:(state, action)=>{
            state.messages.splice(CHAT_COUNT,1);
            state.messages.unshift(action.payload);
        }
    }
});

export const{addMessage}= chatSlice.actions;
export default chatSlice.reducer;