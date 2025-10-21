import { useEffect, useState } from "react";
import CardCarousel from "../components/cardCarousel/CardCarousel";
import "../pages/movies.css";
import {
  useGenre,
  useMoviesByGenre,
  usePopularMovie,
} from "../hooks/useMovies";

export const Movies = () => {
  const title = "Popular Movies";
  const [genreIds, setGenreIds] = useState<string[]>([]);
  const { retriveGenres, genres } = useGenre();
  const { popular, retrivePopularMovies } = usePopularMovie();
  const { moviesByGenre, retriveMoviesByGenre } = useMoviesByGenre(genreIds);
  console.log("moviesByGenre", moviesByGenre);
  console.log("genre", genres);

  useEffect(() => {
    setGenreIds(genres.map((genre) => String(genre.id)));
  }, [genres]);

  useEffect(() => {
    retriveGenres();
    retriveMoviesByGenre();
    retrivePopularMovies();
  }, [retriveGenres, retriveMoviesByGenre, retrivePopularMovies]);

  return (
    <div>
      <CardCarousel title={title} movies={popular} />;
      
      {genres.map((genre) => (
        <CardCarousel
          key={genre.id}
          title={genre.name}
          movies={moviesByGenre[genre.id] || []}
        />
      ))}
    </div>
  );
};
