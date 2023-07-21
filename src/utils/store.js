import {configureStore} from '@reduxjs/toolkit';
import appSlice from './appSlice';
import chatSlice from './chatSlice';
import searchSlice from './searchSlice';
import suggestionsSlice from './suggestionsSlice';

const store = configureStore({
    reducer:{
        app:appSlice,
        suggestions: suggestionsSlice,
        chat: chatSlice,
        searchResults: searchSlice,
    }
});

export default store;