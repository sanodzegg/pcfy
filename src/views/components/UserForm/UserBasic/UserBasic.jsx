import { useEffect, useState } from "react";

export const UserBasic = ({ revalidate, errs, show, setErrs, emitData }) => {
  const data = JSON.parse(sessionStorage.getItem("userData"));

  const [fnValue, setfnValue] = useState(data?.name ? data.name : "");
  const [lnValue, setlnValue] = useState(data?.surname ? data.surname : "");

  const ulang = /^[\u10A0-\u10FF]+$/;

  const handleFN = () => {
    emitData((prev) => ({ ...prev, name: fnValue }));
    if(ulang.test(fnValue.replace(/\s/g, "")) && fnValue.length >= 2) {
      setErrs((prev) => ({
        ...prev,
        firstName: {
          valid: true,
        }
      }));
    } else if(fnValue.length < 2 && fnValue.length !== 0) {
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
        }
      }));
    } else if(lnValue.length < 2 && lnValue.length !== 0) {
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

  useEffect(() => {
    if(revalidate) {
      handleFN();
      handleLN();
    }
  }, [revalidate]);

  return (
    <div className="userFN">
        <div className={show && errs.firstName.valid === false ? "invalid" : ""}>
            <label htmlFor="fname">სახელი</label>
            <input onChange={(e) => setfnValue(e.target.value)} onBlur={handleFN} type="text" placeholder="გრიშა" name="fname" value={fnValue ? fnValue : ""} />
            <span>{errs.firstName.message ? errs.firstName.message : "მინიმუმ 2 სიმბოლო, ქართული ასოები"}</span>
        </div>

        <div className={show && errs.lastName.valid === false ? "invalid" : ""}>
            <label htmlFor="lname">გვარი</label>
            <input onChange={(e) => setlnValue(e.target.value)} onBlur={handleLN} type="text" placeholder="ბაგრატიონი" name="lname" value={lnValue ? lnValue : ""} />
            <span>{errs.lastName.message ? errs.lastName.message : "მინიმუმ 2 სიმბოლო, ქართული ასოები"}</span>
        </div>
    </div>
  );
};
