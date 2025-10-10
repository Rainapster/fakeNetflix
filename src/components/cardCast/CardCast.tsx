import { cardCastProps } from "./cardCast.model";
import "./cardCast.css"

const CardCast = ({ imgCard, name }: cardCastProps) => {
  return (
    <div className="castCard">
      <img src={imgCard} alt="actor image" />
      <p>{name}</p>
    </div>
  );
};

export default CardCast;
