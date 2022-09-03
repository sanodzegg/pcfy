import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";

import { ReactComponent as Logo } from "assets/svg/logo.svg";
import { ReactComponent as Frame } from "assets/svg/landingFrame.svg";
import { ReactComponent as PhoneFrame } from "assets/svg/phoneFrame.svg";

export const Landing = () => {

    const [phoneWidth, setPhoneWidth] = useState(false);

    const navigate = useNavigate();

    const handleAddRoute = () => {
        navigate("/addRecording");
    }

    const handleListRoute = () => {
        navigate("/recordings");
    }

    const handleResize = () => {
        window.innerWidth < 615 ? setPhoneWidth(true) : setPhoneWidth(false);
    }

    useEffect(() => {
        handleResize();
    }, []);
    

    window.addEventListener("resize", handleResize);

    return (
        <main className="landingWrapper">
            <Logo className="logo" />
            {phoneWidth ? <PhoneFrame className="phoneFrame" /> : <Frame className="frame" />}
            <div className="btnsWrapper">
                <button onClick={handleAddRoute}>ჩანაწერის დამატება</button>
                <button onClick={handleListRoute}>ჩანაწერების სია</button>
            </div>
        </main>
    );
};
