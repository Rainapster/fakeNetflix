import { useCallback, useEffect, useState } from "react";
import {
  CastCrewRoot,
  GenreRoot,
  Result,
  RootSeries,
  RootSimilar,
  SeriesRoot,
} from "./series.models";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const option = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
};

export const usePopularSeries = () => {
  const [popularSeries, setPopuplarSeries] = useState<SeriesRoot["results"]>(
    []
  );
  const retrivePopularSeries = useCallback(() => {
    const fetchData = async () => {
      const result = await fetch(
        "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
        option
      );
      const data: SeriesRoot = await result.json();
      setPopuplarSeries(data.results);
    };
    fetchData();
  }, []);
  return { popularSeries, retrivePopularSeries };
};

export const useDetailSeries = (series_id: string) => {
  const [detailSerie, setDetailSerie] = useState<RootSeries>();
  const retriveDetailSeries = useCallback(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://api.themoviedb.org/3/tv/${series_id}?language=en-US`,
        option
      );
      const data: RootSeries = await result.json();
      setDetailSerie(data);
    };
    fetchData();
  }, [series_id]);
  return { detailSerie, retriveDetailSeries };
};

export const useSimilarSeries = (series_id: string) => {
  const [similarSeries, setSimilarSeries] = useState<RootSimilar["results"]>(
    []
  );
  const retriveSimilarSeries = useCallback(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://api.themoviedb.org/3/tv/${series_id}/similar?language=en-US&page=1`,
        option
      );
      const data: RootSimilar = await result.json();
      setSimilarSeries(data.results);
    };
    fetchData();
  }, [series_id]);
  return { retriveSimilarSeries, similarSeries };
};

export const useCastSeries = (series_id: string) => {
  const [credits, setCredits] = useState<CastCrewRoot["cast"]>([]);
  const retriveCastSeries = useCallback(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://api.themoviedb.org/3/tv/${series_id}/credits?language=en-US`,
        option
      );
      const data: CastCrewRoot = await result.json();
      setCredits(data.cast);
    };
    fetchData();
  }, [series_id]);
  return { retriveCastSeries, credits };
};
// series genres
export const useGenre = () => {
  const [genres, setGenres] = useState<GenreRoot["genres"]>([]);
  const retriveGenres = useCallback(() => {
    const fetchData = async () => {
      const result = await fetch(
        "https://api.themoviedb.org/3/genre/tv/list?language=en",
        option
      );
      const data: GenreRoot = await result.json();
      setGenres(data.genres);
    };
    fetchData();
  }, []);
  return { retriveGenres, genres };
};

// export const useSeriesByGen = (genreIds: string[]) => {
  // const [series, setSeries] = useState<SeriesRoot["results"]>([]);
  // const retriveSeriesByGen = useCallback(() => {
  //   const fetchData = async () => {
  //     const result = await fetch(
  //       `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}`,
  //       option);
  //     const data: SeriesRoot = await result.json();
  //     setSeries(data.results);
  //   };
  //   fetchData();
  // }, [genreId]);
  // return { retriveSeriesByGen, series };

export const useSeriesByGenre = (genreIds : string[]) => {
  const [seriesByGenre, setSeriesByGenre] = useState<{ [genreId: string]: Result[] }>({});

  useEffect(()=>{
    // la fetchData è una funzione di appoggio a cui possiamo dare l'async
    // NON possiamo dare l'async a un hook (nè useEffect nè custom hook)
    const fetchData = async () => { 
      const fetchSeriesByGenre: { [genreId: string]: Result[] } = {}; // la copia esiste solo per fare la set in modo ottimale (non dentro il ciclo for)
      for (const genreId of genreIds) {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}`,
          option
        );
        const data: SeriesRoot = await response.json();
        fetchSeriesByGenre[genreId] = data.results;
      }
      // a oggetto finito (fine dei cicli for) settiamo il valore da buttare fuori dal custom hook
      setSeriesByGenre(fetchSeriesByGenre);
    };
    fetchData();
  },[genreIds])

  /*
  l'oggetto risultante conterrà un id genere come chiave a cui corrisponderà un array di series (oggetti) 
  esempio
  {
    16: [{serie1diquelgenere}, {serie2diquelgenere}, ...],
    18: [{serie1diquelgenere}, {serie2diquelgenere}, ...],
    ...
  }
  */

  return {seriesByGenre};
} 
