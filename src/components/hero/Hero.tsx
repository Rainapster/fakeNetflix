import { useEffect } from "react";
import { usePopularMovie } from "../../hooks/useMovies";
import "./hero.css";
const Hero = () => {
  const { popular, retrivePopularMovies } = usePopularMovie();

  const imageHeroBackground = () => {
    return popular.slice(0, 3);
  };
  useEffect(() => {
    retrivePopularMovies();
  }, [retrivePopularMovies]);

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide carousel-hero-custom"
      data-ride="carousel"
    >
      {/* <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          className="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol> */}
      <div className="carousel-inner">
        {imageHeroBackground().map((movie, index) => {
          console.log("index", index);
          return (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img
                className="d-block w-100 carousel-hero-custom"
                key={index}
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
              />
            </div>
          );
        })}
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default Hero;

