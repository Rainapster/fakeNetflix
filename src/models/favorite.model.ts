import { Movie } from "../hooks/movies.model";
import { Result } from "../hooks/series.models";

export interface Favorite{
    id: number;
    mediaType: "movie"| "series";
    title: string;
    overview? : string | null;
    poster_path?: string | null;
    backdrop_path?: string | null;
    vote_average?: number | null
    release_date? : string | null;
    first_air_date?: string | null;
    original_language?: string| null;
}

export type Favorites = Favorite[]

export const movieToFavorite = (m: Movie): Favorite => ({
  id: m.id ?? 0,
  mediaType: "movie",
  title: m.title ?? m.original_title ?? "",
  overview: m.overview ?? null,
  poster_path: m.poster_path ?? null,
  backdrop_path: m.backdrop_path ?? null,
  vote_average: m.vote_average ?? null,
  release_date: m.release_date ?? null,
  original_language: m.original_language ?? null,
});

export const seriesToFavorite = (s: Result): Favorite => ({
  id: s.id,
  mediaType: "series",
  title: s.name ?? s.original_name ?? "",
  overview: s.overview ?? null,
  poster_path: s.poster_path ?? null,
  backdrop_path: s.backdrop_path ?? null,
  vote_average: s.vote_average ?? null,
  first_air_date: s.first_air_date ?? null,
  original_language: s.original_language ?? null,
});