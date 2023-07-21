import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "searchResults",
    initialState:[],
    reducers:{
        setSearchVideos:(state,action)=>{
            return [...action.payload];
        }
    }
})

export const {setSearchVideos} = searchSlice.actions;
export default searchSlice.reducer;