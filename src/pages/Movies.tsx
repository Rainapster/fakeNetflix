import { useEffect } from "react";
import CardCarousel from "../components/cardCarousel/CardCarousel";
import "../pages/movies.css";
import { usePopularMovie } from "../hooks/useMovies";

export const Movies = () => {
  const title = "Popular Movies";
  const { popular, retrivePopularMovies } = usePopularMovie();

  useEffect(()=>{
    retrivePopularMovies()
  },[retrivePopularMovies])

  return <CardCarousel title={title} movies={popular} />;
};
