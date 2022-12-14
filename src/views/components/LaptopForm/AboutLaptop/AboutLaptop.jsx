import { useEffect, useRef, useState } from "react";
import "./AboutLaptop.css";

import { ReactComponent as Errormark } from "assets/svg/error.svg";

export const AboutLaptop = ({ emitErrors, errors, show, emitData, revalidate }) => {

    const data = JSON.parse(sessionStorage.getItem("laptopData"));
    const now = new Date().getFullYear();

    const [date, setDate] = useState(data?.laptop_purchase_date ? data.laptop_purchase_date : "");
    const [localDate, setLocalDate] = useState(data?.purchase_date_local ? data.purchase_date_local : "");

    const [price, setPrice] = useState(data?.laptop_price ? data.laptop_price : "");
    const [laptopState, setLaptopState] = useState(data?.laptop_state ? data.laptop_state : "");

    const radioNew = useRef(null);
    const radioUsed = useRef(null);

    useEffect(() => {
        emitData((prev) => ({ ...prev, laptop_purchase_date: date }));
        emitData((prev) => ({ ...prev, purchase_date_local: localDate }));
    }, [date]);

    useEffect(() => {
        if(revalidate) {
            handleDateBlur();
            handlePriceBlur();
        }
    }, [revalidate]);

    useEffect(() => {
        if(laptopState) {
            emitData((prev) => ({ ...prev, laptop_state: laptopState }));
            emitErrors((prev) => ({ ...prev, state: true }));
        }
        if(laptopState === "new") {
            handleNew();
        } else if(laptopState === "used") {
            handleUsed();
        }
    }, [laptopState]);

    const handleDateChange = (val) => {
        setLocalDate(val);

        const newArr = val.split("-");
        const yy = newArr[0];

        if(val && (yy > 1990 && yy <= now)) {
            emitErrors((prev) => ({ ...prev, date: true }));
        } else emitErrors((prev) => ({ ...prev, date: false }));
    }

    const handleDateBlur = () => {
        if(localDate) {
            const newArr = localDate.split("-");
            const yy = newArr[0];
            const mm = newArr[1];
            const dd = newArr[2];

            if(yy > 1990 && yy <= now) {
                const newDate = `${dd}-${mm}-${yy}`;
                setDate(newDate);
                emitErrors((prev) => ({ ...prev, date: true })) ;
            } else emitErrors((prev) => ({ ...prev, date: false }));
            
        } else {emitErrors((prev) => ({ ...prev, date: true })); setDate("")};
    }

    const handlePriceBlur = () => {
        emitData((prev) => ({ ...prev, laptop_price: parseInt(price) }));
        if((/[\d]/g).test(price)) {
            emitErrors((prev) => ({ ...prev, price: true }));
        } else emitErrors((prev) => ({ ...prev, price: false }));
    }

    const handleNew = () => {
        radioNew.current.style.display = "block";
        radioUsed.current.style.display = "none";

        setLaptopState("new");
        emitData((prev) => ({ ...prev, laptop_state: "new" }));
    }

    const handleUsed = () => {
        radioUsed.current.style.display = "block";
        radioNew.current.style.display = "none";

        setLaptopState("used");
        emitData((prev) => ({ ...prev, laptop_state: "used" }));
    }

    const classes = {
        dateInput: `dateInput${!errors.date && show ? " invalid" : ""}`,
        priceInput: `priceInput${!price && !errors.price && show ? " invalid" : ""}`,
        radioClass: `radioWrapper${!data?.laptop_state && show ? " invalid" : ""}`,
        radioLabel: `radioLabelWrapper${!errors.state && show ? " flex": ""}`
    }

  return (
    <div className="aboutLaptopWrapper">
        <div className="aboutLaptop-col">
            <div className={classes.dateInput}>
                <label htmlFor="date">????????????????????? ?????????????????? (????????????????????????)</label>
                <input onFocus={(e) => e.target.type = "DATE"} maxLength={14} onChange={(e) => handleDateChange(e.target.value)} onBlur={handleDateBlur} type="text" name="date" min="1990-01-01" placeholder="?????? / ?????? / ????????????" value={localDate ? localDate : ""} />
            </div>
            <div className={classes.priceInput}>
                <label htmlFor="price">???????????????????????? ????????????</label>
                <input onChange={(e) => setPrice(e.target.value)} onBlur={handlePriceBlur} type="number" name="price" placeholder="0000" value={price ? price : ""} />
                <span>?????????????????? ?????????????????????</span>
            </div>
        </div>  
        <div className="aboutLaptop-col">
            <div className={classes.radioClass}>
                <div className={classes.radioLabel}>
                    <p>???????????????????????? ?????????????????????????????????</p>
                    {(show && !errors.state) && <Errormark className="error" />}
                </div>
                <div className="radios">
                    <div className="customRadio" onClick={handleNew}>
                    <div className="customRadioWrapper">
                        <div className="radioInside" ref={radioNew}></div>
                    </div>
                    <span>???????????????</span>
                    </div>
                    <div className="customRadio" onClick={handleUsed}>
                    <div className="customRadioWrapper">
                        <div className="radioInside" ref={radioUsed}></div>
                    </div>
                    <span>?????????????????????</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
