import "./AddRecording.css";
import { ReactComponent as Exit } from "assets/svg/exit.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


import { UserForm } from "views/components/UserForm/UserForm";
import { LaptopForm } from "views/components/LaptopForm/LaptopForm";

export const AddRecording = () => {

    const [userRecording, setUserRecording] = useState(null);

    const navigate = useNavigate();

    const [displayForm, setDisplayForm] = useState(null);

    useEffect(() => {
        const formPage = sessionStorage.getItem("formPage");
        if (formPage) {
            setDisplayForm(parseInt(formPage));
        } else setDisplayForm(0);
    }, []);

    useEffect(() => {
        if(userRecording) {
            console.log(userRecording);
        }
    }, [userRecording]);

    return (
        <div className="addRecordWrapper">
            <Exit className="exitBtn" onClick={() => navigate("/")} />
            <div className="formWrapper">
                <div className="formHeader">
                    <span>თანამშრომლის ინფო {displayForm === 0 && <hr />}</span>
                    <span>ლეპტოპის მახასიათებლები {displayForm === 1 && <hr className="laptopHr" />}</span>
                </div>
                {displayForm === 0 ? <UserForm emitRecording={setUserRecording} setPage={setDisplayForm} /> : <LaptopForm setPage={setDisplayForm} />}
            </div>
        </div>
    );
};
