import { useNavigate } from "react-router-dom";
import "./pageNotFound.css";
import CustomButton from "../button/CustomButton";
const PageNotFound = () => {
  const navigateToHome = useNavigate();
  return (
    <div>
      <div className="notFound-background"></div>
      <CustomButton onClick= {()=>{navigateToHome("/")}} />
    </div>
  );
};
export default PageNotFound;
