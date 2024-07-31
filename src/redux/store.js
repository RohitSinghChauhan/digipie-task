import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../redux/reducers/reducer';

const store = configureStore({
    reducer: {
        search: searchReducer,
    },
});

export default store;
