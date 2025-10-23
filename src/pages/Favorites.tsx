import { useSelector } from "react-redux";
import { favoriteSelector } from "../store/favoriteSelectors";
import CardCarousel from "../components/cardCarousel/CardCarousel";
import CustomButton from "../components/button/CustomButton";
import { useNavigate } from "react-router-dom";

export const Favorites = () => {
  const favorites = useSelector(favoriteSelector);
  const navigation = useNavigate()
  const handleClick =() =>{
    navigation(-1)
  }
  return (
    <div>
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
      <CardCarousel movies={favorites} title="favorites" />
    </div>
  );
};
