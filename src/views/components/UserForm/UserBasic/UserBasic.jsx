import { useEffect, useState } from "react";

const data = JSON.parse(sessionStorage.getItem("data"));

export const UserBasic = ({ checker, errs, show, setErrs, emitData }) => {

  const [fnValue, setfnValue] = useState(data.name ? data.name : "");
  const [lnValue, setlnValue] = useState(data.surname ? data.surname : "");

  const ulang = /^[\u10A0-\u10FF]+$/;

  const handleFN = () => {
    emitData((prev) => ({ ...prev, name: fnValue }));
    if(ulang.test(fnValue.replace(/\s/g, "")) && fnValue.length >= 2) {
      setErrs((prev) => ({
        ...prev,
        firstName: {
          valid: true,
          message: ""
        }
      }));
    } else if(fnValue.length < 2) {
      setErrs((prev) => ({
        ...prev,
        firstName: {
          valid: false,
          message: "მინიმუმ 2 სიმბოლო"
        }
      }));
    } else {
      setErrs((prev) => ({
        ...prev,
        firstName: {
          valid: false,
          message: "მინიმუმ 2 სიმბოლო, ქართული ასოები"
        }
      }));
    }
  }

  const handleLN = () => {
    emitData((prev) => ({ ...prev, surname: lnValue }));
    if(ulang.test(lnValue.replace(/\s/g, "")) && lnValue.length >= 2) {
      setErrs((prev) => ({
        ...prev,
        lastName: {
          valid: true,
          message: ""
        }
      }));
    } else if(lnValue.length < 2) {
      setErrs((prev) => ({
        ...prev,
        lastName: {
          valid: false,
          message: "მინიმუმ 2 სიმბოლო"
        }
      }));
    } else {
      setErrs((prev) => ({
        ...prev,
        lastName: {
          valid: false,
          message: "მინიმუმ 2 სიმბოლო, ქართული ასოები"
        }
      }));
    }
  }

  return (
    <div className="userFN">
        <div className={show && errs.firstName.valid == false ? "invalid" : ""}>
            <label htmlFor="fname">სახელი</label>
            <input onChange={(e) => setfnValue(e.target.value)} onBlur={handleFN} type="text" placeholder="გრიშა" name="fname" value={fnValue ? fnValue : ""} />
            <span>{show && errs.firstName.message ? errs.firstName.message : "მინიმუმ 2 სიმბოლო, ქართული ასოები"}</span>
        </div>

        <div className={show && errs.lastName.valid == false ? "invalid" : ""}>
            <label htmlFor="lname">გვარი</label>
            <input onChange={(e) => setlnValue(e.target.value)} onBlur={handleLN} type="text" placeholder="ბაგრატიონი" name="lname" value={lnValue ? lnValue : ""} />
            <span>{show && errs.lastName.message ? errs.lastName.message : "მინიმუმ 2 სიმბოლო, ქართული ასოები"}</span>
        </div>
    </div>
  );
};
