import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Laptop.css";

export const Laptop = ({ imgSrc, laptopID, laptopName, firstName, lastName }) => {
  const navigate = useNavigate();

  const [phoneWidth, setPhoneWidth] = useState(false);
  
  useEffect(() => {
    handleResize();
  }, []);

  const handleResize = () => {
    window.innerWidth < 460 ? setPhoneWidth(true) : setPhoneWidth(false);
  }

  window.addEventListener("resize", handleResize);
  
  const userName = `${firstName} ${lastName}`;

  return (
    <div className="laptopWrapper">
        <div className="laptopImgWrapper">
            <img src={`https://pcfy.redberryinternship.ge${imgSrc}`} alt="user laptop" />
        </div>
        <div className="laptopInfoWrapper">
            <p className="userName">{phoneWidth && userName.length > 14 ? `${userName.slice(0, 14)}...` : userName}</p>
            <p className="laptop">{phoneWidth && laptopName.length > 10 ? `${laptopName.slice(0, 10)}...` : laptopName}</p>
            <p className="seeMore" onClick={() => navigate(`/recording/${laptopID}`)}>მეტის ნახვა</p>
        </div>
    </div>
  );
};
