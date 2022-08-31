import "./Navigation.css";

import { ReactComponent as Postman } from "assets/svg/postman.svg";
import axios from "axios";

export const Navigation = ({ setPage, setErrors, updateChecker, errors }) => {

    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const laptopData = JSON.parse(sessionStorage.getItem("laptopData"));

    const handleBack = () => {
        sessionStorage.setItem("formPage", 0);
        setPage(0);
    }

    const handleSave = async (e) => {
        e.preventDefault();

        if(!userData) {
            handleBack();
        }
        
        updateChecker(true);
        setErrors(true);

        const invalid = errors.some(e => e === false);

        if(!invalid) {
            const newUserData = {...userData};
            newUserData.position_id = userData.position_id.id;
            newUserData.team_id = userData.team_id.id;
    
            const {binary, purchase_date_local, ...newLaptopData} = laptopData;
            newLaptopData.laptop_brand_id = laptopData.laptop_brand_id.id;
            newLaptopData.laptop_cpu = laptopData.laptop_cpu.id;
    
            const merged = { ...newUserData, ...newLaptopData };
            merged.token = "254c17394feb86133ca156ef9b4d9a91";

            const req = await axios.post("https://pcfy.redberryinternship.ge/api/laptop/create", merged);
            const res = await req;
            console.log(res);
        }


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
