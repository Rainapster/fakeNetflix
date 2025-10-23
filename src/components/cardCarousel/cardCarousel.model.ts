import { Movie } from "../../hooks/movies.model";
import { Favorite } from "../../models/favorite.model";

export interface cardCaruoselProps{
    movies : Movie[] | Favorite[];
    title : string;
    customNavigationParams?: string;

}