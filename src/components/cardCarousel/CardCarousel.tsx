import CardMovies from "../movies/CardMovies";
import { cardCaruoselProps } from "./cardCarousel.model";
import "./cardCarousel.css"

const CardCarousel = ({ movies, title }: cardCaruoselProps) => {
  return (
    <div className="carousel-container">
      <h1 style={{color:"white", paddingLeft:"24px"}}>{title}</h1>
      <div className="d-flex custom-scroll">
        {!movies.length
          ? "no movie found"
          : movies.map(
              ({
                id,
                title,
                release_date,
                vote_average,
                poster_path,
              }) => {
                return (
                  <CardMovies
                    classname="customCard mx-2"
                    key={id}
                    id={id as number}
                    title={title}
                    release_date={release_date}
                    vote_average={vote_average}
                    poster_path={poster_path}
                  />
                );
              }
            )}
      </div>
    </div>
  );
};

export default CardCarousel;
