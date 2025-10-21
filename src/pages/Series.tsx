import { useEffect, useState } from "react";
import CardCarousel from "../components/cardCarousel/CardCarousel";
import {
  useGenre,
  usePopularSeries,
  useSeriesByGenre,
} from "../hooks/useSeries";
import { SeriesRoot } from "../hooks/series.models";

export const Series = () => {
  const title = "Popular Series";
  const [genreIds, setGenreIds] = useState<string[]>([]);
  const { popularSeries, retrivePopularSeries } = usePopularSeries();
  const { retriveGenres, genres } = useGenre();
  const { seriesByGenre } = useSeriesByGenre(genreIds);

  useEffect(() => {
    retriveGenres();
    retrivePopularSeries();
  }, [retriveGenres, retrivePopularSeries]);
  console.log("popularseries: ", popularSeries);
  console.log("genre", genres);
  console.log("serie by gen", seriesByGenre);

  useEffect(() => {
    setGenreIds(genres.map((genre) => String(genre.id)));
    console.log("setGenreIds", setGenreIds);
  }, [genres]);

  const getMappedSeries = (series: SeriesRoot["results"]) =>
    series.map((serie) => {
      return {
        ...serie,
        title: serie.name,
        release_date: serie.first_air_date,
        poster_path: serie.poster_path ?? "",
      };
    });
  const mappedPopularSeries = getMappedSeries(popularSeries);

  return (
    <div>
      <div>
        <CardCarousel
          title={title}
          movies={mappedPopularSeries}
          customNavigationParams="isSerie=true"
        />
      </div>
      <div>
        {genres.map((genre) => {
          const seriesForGenre = seriesByGenre[genre.id] || [];
          if (!seriesForGenre.length) return null; // Non mostrare se non ci sono serie per quel genere
          const mappedSeries = getMappedSeries(seriesForGenre);
          return (
            <CardCarousel
              key={genre.id}
              title={genre.name}
              movies={mappedSeries}
              customNavigationParams="isSerie=true"
            />
          );
        })}
      </div>
    </div>
  );
};
