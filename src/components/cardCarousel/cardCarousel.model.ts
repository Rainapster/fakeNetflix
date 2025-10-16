import { Movie } from "../../hooks/movies.model";

export interface cardCaruoselProps{
    movies : Movie[];
    title : string;
    customNavigationParams?: string;

}