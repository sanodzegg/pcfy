import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

export const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="errorPageWrapper">
            <div className="errPageInner">
                <h1>Wrong way!</h1>
                <button onClick={() => navigate("/")}>Go Back</button>
            </div>
        </div>
    );
};
