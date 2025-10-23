import { createSelector } from "@reduxjs/toolkit";
import { State } from "./store";

const state = (state : State) => state 

export const favoriteSelector = createSelector(
    state, (state) => state.favorite.storeFavorites
)