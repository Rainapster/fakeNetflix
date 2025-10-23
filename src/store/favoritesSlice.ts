import { createSlice } from "@reduxjs/toolkit";
import { Favorites, Favorite } from "../models/favorite.model";

interface initialStateProps {
  storeFavorites: Favorites;
}

const initialState: initialStateProps = {
  storeFavorites: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorite: (state, { payload }: { payload: Favorites }) => {
      state.storeFavorites = payload;
    },
    addToFavorite: (state, { payload }: { payload: Favorite }) => {
      if (
        !state.storeFavorites.some(
          (f) => f.id === payload.id && f.mediaType === payload.mediaType
        )
      ) {
        state.storeFavorites.push(payload);
      }
    },
    removeFromFavorite: (state, { payload }: { payload: Favorite }) => {
      state.storeFavorites = state.storeFavorites.filter(
        (f) => !(f.id === payload.id && f.mediaType === payload.mediaType)
      );
    },
  },
});

export const {setFavorite,addToFavorite,removeFromFavorite } = favoritesSlice.actions;
export const favoriteReducer = favoritesSlice.reducer