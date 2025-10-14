import { cardCastProps } from "./cardCast.model";
import "./cardCast.css"

const CardCast = ({ imgCard, name }: cardCastProps) => {
  return (
    <div className="castCard">
      <img className="img-card-cast" src={!imgCard ? "../../../public/Burbaloni-Luliloli-Brainrot-Trend-1467.png" :`https://image.tmdb.org/t/p/w500/${imgCard}`} alt="actor image" />
      <p className="text-center">{name}</p>
    </div>
  );
};

export default CardCast;

