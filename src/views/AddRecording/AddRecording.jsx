import "./AddRecording.css";
import { ReactComponent as Exit } from "assets/svg/exit.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


import { UserForm } from "views/components/UserForm/UserForm";
import { LaptopForm } from "views/components/LaptopForm/LaptopForm";

export const AddRecording = () => {
    const navigate = useNavigate();

    const [displayForm, setDisplayForm] = useState(0);
    const [formResponse, setFormResponse] = useState(null);
    
    useEffect(() => {
        const formPage = sessionStorage.getItem("formPage");
        if (formPage) {
            setDisplayForm(parseInt(formPage));
        } else setDisplayForm(0);
    }, []);

    const goPrevious = () => {
        setDisplayForm(0);
        sessionStorage.setItem("formPage", 0);
    }

    useEffect(() => {
        if(formResponse) {
            sessionStorage.removeItem("userData");
            sessionStorage.removeItem("laptopData");

            navigate("success");
        }
    }, [formResponse]);

    return (
        <div className="addRecordWrapper">
            <Exit className="exitBtn" onClick={() => { displayForm === 0 ? navigate(-1) : goPrevious(); }} />
            <div className="formWrapper">
                <div className="formHeader">
                    <span>თანამშრომლის ინფო {displayForm === 0 && <hr />}</span>
                    <span>ლეპტოპის მახასიათებლები {displayForm === 1 && <hr className="laptopHr" />}</span>
                </div>
                {displayForm === 0 ? <UserForm setPage={setDisplayForm} /> : <LaptopForm setPage={setDisplayForm} emitResponse={setFormResponse} />}
            </div>
        </div>
    );
};
