import { cardMovieProps } from "./cardMovies.model"
import "./CardMovies.css"
import { Link } from "react-router-dom"

const CardMovies = ({title, release_date, vote_average,poster_path, id, customNavigationParams }:cardMovieProps) =>{
    return(
        <Link to={`/detail/${id}${customNavigationParams ? `?${customNavigationParams}`: ''}`} className="customCard mx-2">
           <h3 className="textCard">{title}</h3> 
           <p>{release_date}</p>
           <p>{vote_average}</p>
           <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title}/>
        </Link>
    )
}
export default CardMovies
