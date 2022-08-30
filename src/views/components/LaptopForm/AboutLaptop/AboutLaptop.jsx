import { useRef, useState } from "react";
import "./AboutLaptop.css";

export const AboutLaptop = () => {

    const data = JSON.parse(sessionStorage.getItem("laptopData"));

    const [date, setDate] = useState("");

    const handleDateChange = (val) => {
        const parsed = val.replace(/[^\dA-Z]/g, '').replace(/(.{2})(.{2})/i, "$1 / $2 / ").replace(/(.{4})/g, "$1").trim();
        setDate(parsed);
    }

    const handleDateBlur = () => {
        console.log(date);
    }

  return (
    <div className="aboutLaptopWrapper">
        <div className="aboutLaptop-col">
            <div className="dateInput">
                <label htmlFor="date">შეძენის რიცხვი (არჩევითი)</label>
                <input maxLength={14} onChange={(e) => handleDateChange(e.target.value)} onBlur={handleDateBlur} type="text" name="date" placeholder="დდ / თთ / წწწწ" value={date ? date : ""} />
            </div>
            <div className="priceInput">
                <label htmlFor="price">ლეპტოპის ფასი</label>
                <input type="number" name="price" placeholder="0000" />
                <span>მხოლოდ ციფრები</span>
            </div>
        </div>  
        <div className="aboutLaptop-col">
            <div className="radioWrapper">
            <p>მეხსიერების ტიპი</p>
            <div className="radios">
                <div className="customRadio">
                <div className="customRadioWrapper">
                    <div className="radioInside"></div>
                </div>
                <span>ახალი</span>
                </div>
                <div className="customRadio">
                <div className="customRadioWrapper">
                    <div className="radioInside"></div>
                </div>
                <span>მეორადი</span>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
};
