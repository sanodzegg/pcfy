import { useEffect, useRef, useState } from "react";
import "./Navigation.css";

import { ReactComponent as Postman } from "assets/svg/postman.svg";
import axios from "axios";

export const Navigation = ({ setPage, setErrors, updateChecker, errors, imgObject, emitResponse }) => {

    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const laptopData = JSON.parse(sessionStorage.getItem("laptopData"));

    const [canSend, setCanSend] = useState(false);
    const [sending, setSending] = useState(false);

    const sendBtn = useRef(null);

    const handleBack = () => {
        sessionStorage.setItem("formPage", 0);
        setPage(0);
    }

    const handleSave = (e) => {
        e.preventDefault();

        if(!userData) {
            handleBack();
        }
        
        setErrors(true);
        setCanSend(true);
    }

    useEffect(() => {
        updateChecker(true);
        const newErrors = [];

        errors.forEach(e => {
            if(typeof e === "object") {
                Object.values(e).map(y => {
                    newErrors.push(y)
                })
            } else newErrors.push(e);
        });

        const invalid = newErrors.some(e => e !== true);

        if(invalid) {
            setCanSend(false);
        }

        if(!invalid && canSend) {
            setSending(true);
            sendData();
        }

    }, [errors, canSend]);

    const sendData = async () => {
        const formData = new FormData();

        const newUserData = {...userData};
        newUserData.position_id = userData.position_id.id;
        newUserData.team_id = userData.team_id.id;

        const { binary, purchase_date_local, laptop_image_info, ...newLaptopData } = laptopData;
        newLaptopData.laptop_image = imgObject;
        newLaptopData.laptop_brand_id = laptopData?.laptop_brand_id?.id;
        newLaptopData.laptop_cpu = laptopData?.laptop_cpu?.name;
        newUserData.phone_number = userData.phone_number.split(" ").join("");

        const merged = { ...newUserData, ...newLaptopData };
        merged.token = process.env.REACT_APP_TOKEN;

        Object.entries(merged).forEach(pair => {
            formData.append(pair[0], pair[1]);
        });

        try {
            const req = await axios.post("https://pcfy.redberryinternship.ge/api/laptop/create", formData, { headers: {
                "content-type": "multipart/form-data"
            } });
            const res = req.status;
            emitResponse(res);
        } catch(err) {
            const errResp = await err.response.status;
            emitResponse(errResp);
        }

        setCanSend(false);
    }

    return (
        <>
            <div className="navWrapper">
                <button onClick={handleBack}>უკან</button>
                <button className={sending ? "sending" : ""} ref={sendBtn} onClick={(e) => handleSave(e)}>{sending ? "მახსოვრდება" : "დამახსოვრება"}</button>
            </div>
            <Postman className="postman" />
        </>
    );
};
