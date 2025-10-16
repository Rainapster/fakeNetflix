import { useCallback, useState } from "react";
import { CreditsRoot, MovieDetailRoot, MovieResponse, Root } from "./movies.model";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const option = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
};

export const usePopularMovie = () => {
  const [popular, setPopular] = useState<MovieResponse["results"]>([]);
  const [page, setPage] = useState(1);

  // GET POPULARE MOVIE
  const retrivePopularMovies = useCallback(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
        option
      );
      const data: MovieResponse = await result.json();
      setPopular(data.results);
    };
    fetchData();
  }, [page]);

  console.log("stampo popular", popular);
  return { popular, page, setPage, retrivePopularMovies };
};

// GET MOVIE DETAIL BASED ON ID
export const useDetailMovie = (id: string) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetailRoot>()

  const retriveMovieDetail = useCallback(() => {
    const fetchData = async() => {
      const result = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,option
      );
      const data: MovieDetailRoot = await result.json();
      setMovieDetails(data)
    };
    fetchData()
  }, [id]);

  return {movieDetails, retriveMovieDetail}
};
// GET SIMILAR MOVIE FROM MOVIE_ID
export const useSimilarMovies = (movie_id : string) =>{
  const [similar, setSimilar] = useState <MovieResponse["results"]> ([])
  const retriveSimilarMovies = useCallback(()=>{
    const fetchData = async()=>{
      const result = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/similar?language=en-US&page=1`, option)
      const data : MovieResponse = await result.json()
      setSimilar(data.results)
    }
      fetchData()
  },[movie_id])
  return {retriveSimilarMovies, similar}
}

//GET VIDEO TRAILER FROM MOVIE_ID
export const useVideoTrailer = (movie_id : string) =>{
  const [videoTrailer, setVideoTrailer] = useState <Root["results"]>([])

  const retriveVideoTrailer = useCallback(() =>{
    const fetchData = async() =>{
      const result = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, option)
      const data :Root =await result.json()
      setVideoTrailer(data.results)
    }
    fetchData()
  },[movie_id])
  return{retriveVideoTrailer, videoTrailer}
}

//GET THE ACTOR CAST ON MOVIE FROM MOVIE ID
export const useCast = (movie_id :string) =>{
  const [cast, setCast] = useState <CreditsRoot["cast"]>([])
  const retriveCast = useCallback(()=>{
    const fetchData = async() =>{
      const result = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits`, option)
      const data : CreditsRoot = await result.json()
      setCast(data.cast)
    }
    fetchData()
  },[movie_id])
  return {cast, retriveCast}
}

