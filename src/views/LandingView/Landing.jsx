import { useNavigate } from "react-router-dom";
import "./Landing.css";

import { ReactComponent as Logo } from "assets/svg/logo.svg";
import { ReactComponent as Frame } from "assets/svg/landingFrame.svg";

export const Landing = () => {

    const navigate = useNavigate();

    const handleAddRoute = () => {
        navigate("/addRecording");
    }

    const handleListRoute = () => {
        navigate("/recordings");
    }

    return (
        <main className="landingWrapper">
            <Logo className="logo" />
            <Frame className="frame" />
            <div className="btnsWrapper">
                <button onClick={handleAddRoute}>ჩანაწერის დამატება</button>
                <button onClick={handleListRoute}>ჩანაწერების სია</button>
            </div>
        </main>
    );
};
