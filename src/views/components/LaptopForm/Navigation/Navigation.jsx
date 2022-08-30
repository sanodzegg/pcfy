import "./Navigation.css";

import { ReactComponent as Postman } from "assets/svg/postman.svg";

export const Navigation = ({ setPage, setErrors, updateChecker }) => {

    const handleBack = () => {
        sessionStorage.setItem("formPage", 0);
        setPage(0);
    }

    const handleSave = (e) => {
        e.preventDefault();
        
        updateChecker(true);
        setErrors(true);
    }

    return (
        <>
            <div className="navWrapper">
                <button onClick={handleBack}>უკან</button>
                <button onClick={(e) => handleSave(e)}>დამახსოვრება</button>
            </div>
            <Postman className="postman" />
        </>
    );
};
