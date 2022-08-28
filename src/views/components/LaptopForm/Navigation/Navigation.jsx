import "./Navigation.css";

import { ReactComponent as Postman } from "assets/svg/postman.svg";

export const Navigation = ({ setPage }) => {

    const handleBack = () => {
        sessionStorage.setItem("formPage", 0);
        setPage(0);
    }

    const handleSave = () => {

    }

    return (
        <>
            <div className="navWrapper">
                <button onClick={handleBack}>უკან</button>
                <button onClick={handleSave}>დამახსოვრება</button>
            </div>
            <Postman className="postman" />
        </>
    );
};
