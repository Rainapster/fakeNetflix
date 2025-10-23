import { configureStore } from "@reduxjs/toolkit";
import { favoriteReducer } from "./favoritesSlice";

export const store = configureStore({
    reducer:{
        favorite : favoriteReducer
    }
})

export type State = ReturnType<typeof store.getState>