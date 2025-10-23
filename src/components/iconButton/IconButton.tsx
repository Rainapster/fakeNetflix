import { iconButtonProps } from "./iconButton.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
const IconButton = ({style, isFavorite= false,onClick }: iconButtonProps) => {
  return (
    <div style={style} onClick={onClick}>
      {isFavorite ? (
        <FontAwesomeIcon icon={fasHeart} />
      ) : (
        <FontAwesomeIcon icon={farHeart} />
      )}
    </div>
  );
};

export default IconButton;
