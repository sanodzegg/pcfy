import "./AddRecording.css";
import { ReactComponent as Exit } from "assets/svg/exit.svg";
import { ReactComponent as PhoneExit } from "assets/svg/phoneExit.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


import { UserForm } from "views/components/UserForm/UserForm";
import { LaptopForm } from "views/components/LaptopForm/LaptopForm";

export const AddRecording = () => {

    const data = sessionStorage.getItem("userData");

    const navigate = useNavigate();

    const [displayForm, setDisplayForm] = useState(0);
    const [formResponse, setFormResponse] = useState(null);

    const [phoneWidth, setPhoneWidth] = useState(false);
    const [phoneHeader, setPhoneHeader] = useState(false);
    
    useEffect(() => {
        const formPage = sessionStorage.getItem("formPage");
        if (formPage) {
            setDisplayForm(parseInt(formPage));
        } else setDisplayForm(0);

        handleResize();
    }, []);

    const handleResize = () => {
        window.innerWidth < 850 ? setPhoneWidth(true) : setPhoneWidth(false);
        window.innerWidth < 650 ? setPhoneHeader(true) : setPhoneHeader(false);
    }

    const goPrevious = () => {
        setDisplayForm(0);
        sessionStorage.setItem("formPage", 0);
    }

    useEffect(() => {
        if(formResponse) {
            sessionStorage.clear();

            formResponse === 200 ? navigate("success") : navigate("snap");
        }
    }, [formResponse]);
    
    const handleUserNavigate = () => {
        if(data) {
            setDisplayForm(0);
            sessionStorage.setItem("formPage", 0);
        }    
    }

    const handleLaptopNavigate = () => {
        const lpav = sessionStorage.getItem("lpav") === "true" ? true : false;
        if(lpav) {
            setDisplayForm(1);
            sessionStorage.setItem("formPage", 1);
        }
    }

    window.addEventListener("resize", handleResize);

    const PCHeader = () => {
        return (
            <div className="formHeader">
                <span onClick={handleUserNavigate}>თანამშრომლის ინფო {displayForm === 0 && <hr />}</span>
                {window.innerWidth > 680 && <span onClick={handleLaptopNavigate}>ლეპტოპის მახასიათებლები {displayForm === 1 && <hr className="laptopHr" />}</span>}
            </div>
        )
    }

    const PHHeader = () => {
        return (
            <div className="mobileFormHeader">
                <span>{displayForm === 0 ? "თანამშრომლის ინფო" : "ლეპტოპის მახასიათებლები"}</span>
                <p>{displayForm === 0 ? "1/2" : "2/2"}</p>
            </div>
        )
    }

    return (
        <div className="addRecordWrapper">
            {phoneWidth ? <PhoneExit className="phoneExitBtn" onClick={() => { displayForm === 0 ? navigate(-1) : goPrevious(); }} /> 
            : <Exit className="exitBtn" onClick={() => { displayForm === 0 ? navigate(-1) : goPrevious(); }} />}
            <div className="formWrapper">
                {phoneHeader ? <PHHeader /> : <PCHeader />}
                {displayForm === 0 ? <UserForm setPage={setDisplayForm} /> : <LaptopForm setPage={setDisplayForm} emitResponse={setFormResponse} />}
            </div>
        </div>
    );
};
