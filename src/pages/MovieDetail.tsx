import { useParams } from "react-router-dom";
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

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { movieDetails, retriveMovieDetail } = useDetailMovie(id as string);
  const {
    original_title,
    original_language,
    overview,
    production_countries,
    production_companies,
    backdrop_path,
  } = movieDetails ?? {}; // ?? = coaleshing operator, non è altro che è un or || più selettivo

  const { similar, retriveSimilarMovies } = useSimilarMovies(id as string);
  const { retriveVideoTrailer, videoTrailer } = useVideoTrailer(id as string);
  const {retriveCast, cast} = useCast(id as string)
  console.log("cast", cast)
  //   console.log('videoTrailer', videoTrailer);
  const trailer = videoTrailer.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  //   console.log('trailer', trailer);
  const trailerLink = `https://www.youtube.com/embed/${trailer?.key}?autoplay=1&mute=1&rel=0&controls=0&loop=1`;
  //   console.log("trailerLink",trailerLink)

  useEffect(() => {
    retriveMovieDetail();
    retriveSimilarMovies();
    retriveVideoTrailer();
    retriveCast();
  }, [retriveCast, retriveMovieDetail, retriveSimilarMovies, retriveVideoTrailer]);

  //   console.log("similarMovies are: ", similar);
  //   console.log("movieDetails", movieDetails);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

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

      <CastCarousel cast={cast} title={"Cast"}/>

      <div className="container-similar-carousel">
        <CardCarousel
          movies={similar}
          title="Similar to the ones you looked at"
        />
      </div>
    </>
  );
};


export default MovieDetail;
