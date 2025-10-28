import { useSelector } from "react-redux";
import { favoriteSelector } from "../store/favoriteSelectors";
import CardCarousel from "../components/cardCarousel/CardCarousel";


export const Favorites = () => {
  const favorites = useSelector(favoriteSelector);
//   const navigation = useNavigate()
//   const handleClick =() =>{
//     navigation(-1)
//   }
  return (
    <div>
 
      <CardCarousel movies={favorites} title="favorites" />
    </div>
  );
};
