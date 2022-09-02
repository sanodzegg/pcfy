import { useNavigate } from "react-router-dom";
import "./Laptop.css";

export const Laptop = ({ imgSrc, laptopID, laptopName, firstName, lastName }) => {
  const navigate = useNavigate();

  return (
    <div className="laptopWrapper">
        <div className="laptopImgWrapper">
            <img src={`https://pcfy.redberryinternship.ge${imgSrc}`} alt="user laptop" />
        </div>
        <div className="laptopInfoWrapper">
            <p className="userName">{firstName} {lastName}</p>
            <p className="laptop">{laptopName}</p>
            <p className="seeMore" onClick={() => navigate(`/recording/${laptopID}`)}>მეტის ნახვა</p>
        </div>
    </div>
  );
};
