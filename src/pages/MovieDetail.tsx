import { useLocation, useParams } from "react-router-dom";
import {
  useCast,
  useDetailMovie,
  useSimilarMovies,
  useVideoTrailer,
} from "../hooks/useMovies";
import {useEffect } from "react";
import "./movieDetail.css";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/button/CustomButton";
import CardCarousel from "../components/cardCarousel/CardCarousel";
import VideoPlayer from "../components/videoPlayer/VideoPlayer";
import CastCarousel from "../components/actorCarousel/CastCarousel";
import { useCastSeries, useDetailSeries, useSimilarSeries } from "../hooks/useSeries";
import { useDispatch, useSelector } from "react-redux";
import { favoriteSelector } from "../store/favoriteSelectors";
import { addToFavorite, removeFromFavorite } from "../store/favoritesSlice";
import { movieToFavorite, seriesToFavorite } from "../models/favorite.model";
import IconButton from "../components/iconButton/IconButton";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const isSerie = queryParams.get("isSerie")

  const {detailSerie, retriveDetailSeries} = useDetailSeries( id as string)
  const {movieDetails, retriveMovieDetail } = useDetailMovie(id as string);
  
  const details = isSerie ? detailSerie : movieDetails;
  const original_title = isSerie ? detailSerie?.original_name : movieDetails?.original_title;
  const {
    original_language,
    overview,
    production_countries,
    production_companies,
    backdrop_path,
  } = details ?? {}; 

  // ?? = coaleshing operator, non è altro che è un or || più selettivo
  const {similarSeries, retriveSimilarSeries} = useSimilarSeries(id as string)
  const { similar, retriveSimilarMovies } = useSimilarMovies(id as string);
  const { retriveVideoTrailer, videoTrailer } = useVideoTrailer(id as string);
  const {retriveCast, cast} = useCast(id as string)
  const {retriveCastSeries, credits} = useCastSeries (id as string)
  console.log("cast", cast)
  console.log("cast serie", credits)

const uniformateSimilarSeries = similarSeries.map((serie) => {
  return {
    ...serie,
    title: serie.name,
    release_date: serie.first_air_date,
    poster_path: serie.poster_path ?? ""
  };
});

// const uniformedCast = credits.map((cast)=> {cast.name =}})

  //   console.log('videoTrailer', videoTrailer);
  const trailer = videoTrailer.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  //   console.log('trailer', trailer);
  const trailerLink = `https://www.youtube.com/embed/${trailer?.key}?autoplay=1&mute=1&rel=0&controls=0&loop=1`;
  //   console.log("trailerLink",trailerLink)

  useEffect(() => {
    if(isSerie){
      retriveCastSeries();
      retriveDetailSeries();
      retriveSimilarSeries();
    }else{
      retriveMovieDetail();
      retriveSimilarMovies();
      retriveVideoTrailer();
      retriveCast();
    }
  }, [isSerie, retriveCast, retriveCastSeries, retriveDetailSeries, retriveMovieDetail, retriveSimilarMovies, retriveSimilarSeries, retriveVideoTrailer]);

  //   console.log("similarMovies are: ", similar);
  //   console.log("movieDetails", movieDetails);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  console.log("location",location)
  console.log("queryParams",queryParams)
  console.log("isSerie",isSerie)
  console.log("similarSerie", uniformateSimilarSeries)

  // Store
  const idNum = Number(id)
  const dispatch = useDispatch();
  const favorites = useSelector(favoriteSelector)
  const isFavorited = favorites.some(
    (f) => f.id === idNum && f.mediaType === (isSerie ? "series" : "movie")
  );
  const handleToggleFavorite = () =>{
    if(isFavorited){
      const favorite = favorites.find((fav)=>fav.id === idNum && fav.mediaType === (isSerie ? "series" : "movie") )
      if(favorite) dispatch(removeFromFavorite(favorite))
        return
    }
        if (isSerie) {
      if (!detailSerie) return;
      dispatch(addToFavorite(seriesToFavorite(detailSerie)));
    } else {
      if (!movieDetails) return;
      dispatch(addToFavorite(movieToFavorite(movieDetails)));
    }
  }
  console.log("isFavorited", isFavorited)
  console.log("favorites",favorites)

  return (
    <>
      <div
        className="backgroundImg"
        style={{
          backgroundImage:
            !trailer && backdrop_path
              ? `url(https://image.tmdb.org/t/p/w780${backdrop_path})`
              : "",
        }}
      >
        {trailer && (
          <VideoPlayer className="backgroundVideo" src={trailerLink} />
        )}
        <CustomButton
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 3,
            margin: "8px 24px",
          }}
          onClick={handleClick}
        />

        <IconButton
          isFavorite= {isFavorited}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 3,
            margin: "8px 24px",
          }}
          onClick={handleToggleFavorite}
        />

        <h2 className="page-title">Movie Detail</h2>
        {!trailer && <div className="gradient"></div>}
      </div>
      <div className="details-container d-flex">
        <div className="title-text">
          <h2> Title: {original_title}</h2>
        </div>
        <div className="information-text">
          <p>Language: {original_language}</p>
          {production_companies?.map((company) => (
            <p key={company.id}>Production Company: {company.name}</p>
          ))}
          {production_countries?.map((countries) => (
            <p>Production Country: {countries.name}</p>
          ))}
        </div>
      </div>
      <div className="description-movie">
        <p>{overview}</p>
      </div>

      <CastCarousel cast={isSerie? credits : cast} title={"Cast"}/>

      <div className="container-similar-carousel">
        <CardCarousel
          movies={isSerie ? uniformateSimilarSeries : similar}
          title="Similar to the ones you looked at"
        />
      </div>
    </>
  );
};

export default MovieDetail;