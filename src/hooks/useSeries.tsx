import { useCallback, useState } from "react";
import { RootSeries, RootSimilar, SeriesRoot } from "./series.models";

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
  },[]);
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
  return {detailSerie, retriveDetailSeries}
};

export const useSimilarSeries = (series_id : string) =>{
  const [similarSeries, setSimilarSeries] = useState <RootSimilar["results"]> ([])
  const retriveSimilarSeries = useCallback(() =>{
    const fetchData = async() =>{
      const result = await fetch(`https://api.themoviedb.org/3/tv/${series_id}/similar?language=en-US&page=1`, option)
      const data : RootSimilar = await result.json()
      setSimilarSeries(data.results)
    };
    fetchData()
  },[series_id]);
  return{retriveSimilarSeries, similarSeries}
}

