import "./Navigation.css";

import { ReactComponent as Postman } from "assets/svg/postman.svg";
import axios from "axios";

export const Navigation = ({ setPage, setErrors, updateChecker, errors, imgObject, emitResponse }) => {

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

        const valid = errors.some(e => e === true);

        const formData = new FormData();

        if(valid) {
            const newUserData = {...userData};
            newUserData.position_id = userData.position_id.id;
            newUserData.team_id = userData.team_id.id;
    
            const {binary, purchase_date_local, ...newLaptopData} = laptopData;
            newLaptopData.laptop_image = imgObject;
            newLaptopData.laptop_brand_id = laptopData.laptop_brand_id.id;
            newLaptopData.laptop_cpu = laptopData.laptop_cpu.name;
            newUserData.phone_number = userData.phone_number.split(" ").join("");
    
            const merged = { ...newUserData, ...newLaptopData };
            merged.token = "254c17394feb86133ca156ef9b4d9a91";

            Object.entries(merged).forEach(pair => {
                formData.append(pair[0], pair[1]);
            });

            const req = await axios.post("https://pcfy.redberryinternship.ge/api/laptop/create", formData);
            const res = await req.status;

            emitResponse(res);
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
