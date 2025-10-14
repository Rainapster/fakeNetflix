import CardCast from "../cardCast/CardCast";
import { actorCarouselProps } from "./castCarousel.model";

const CastCarousel = ({ cast, title }: actorCarouselProps) => {
  return (
    <div>
      <h2 style={{color:"white", paddingLeft:"24px"}}>{title}</h2>
      <div className="custom-scroll">
        {cast.map((actor) => (
          <CardCast imgCard={actor.profile_path as string} name={actor.name} />
        ))}
      </div>
    </div>
  );
};
export default CastCarousel;
