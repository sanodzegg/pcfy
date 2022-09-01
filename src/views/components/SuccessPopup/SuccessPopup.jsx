import React from "react";
import "./SuccessPopup.css";

import { ReactComponent as PopupIcon } from "assets/svg/success.svg";

export const SuccessPopup = () => {
  return (
    <div className="popupWrapper">
        <div className="popup">
            <div className="popupInner">
                <PopupIcon />
                <p>ჩანაწერი დამატებულია!</p>
                <button>სიაში გადაყვანა</button>
                <span>მთავარი</span>
            </div>
        </div>
    </div>
  );
};
