import React from "react";
import "./SuccessPopup.css";

import { ReactComponent as PopupIcon } from "assets/svg/success.svg";
import { useNavigate } from "react-router-dom";

export const SuccessPopup = () => {

  const navigate = useNavigate();

  return (
    <div className="popupWrapper">
        <div className="popup">
            <div className="popupInner">
                <PopupIcon />
                <p>ჩანაწერი დამატებულია!</p>
                <button onClick={() => navigate("/recordings")}>სიაში გადაყვანა</button>
                <span onClick={() => navigate("/")}>მთავარი</span>
            </div>
        </div>
    </div>
  );
};
