import { useEffect, useRef, useState } from "react";
import axios from "axios"

import { ReactComponent as Arrow } from "assets/svg/selectArrow.svg";

export const LaptopBrand = ({ errors, show, emitData, emitErrors, setLeptopID, revalidate }) => {

  const data = JSON.parse(sessionStorage.getItem("laptopData"));

  const [laptopName, setLaptopName] = useState(data?.name ? data.name : "");
  const [displayBrands, setDisplayBrands] = useState(false);
  const [laptopBrands, setLaptopBrands] = useState([]);

  const [chosenBrand, setChosenBrand] = useState(data?.brand ? data.brand : {});

  const handleNameInput = () => {
    const regex = /^[a-zA-Z0-9!@#$%*&=()\\-`.+,/\"]*$/i;
    emitData((prev) => ({
      ...prev,
      name: laptopName
    }));
    if(regex.test(laptopName) && laptopName.length > 0) {
      emitErrors((prev) => ({
        ...prev,
        name: true
      }));
    } else {
      emitErrors((prev) => ({
        ...prev,
        name: false
      }));
    }
  }

  useEffect(() => {
    const getBrands = async () => {
      const response = await axios.get("https://pcfy.redberryinternship.ge/api/brands");
      const data = await response.data;
      setLaptopBrands(data.data);
    }

    getBrands();
  }, []);

  const handleLaptopBrand = (e) => {
    setChosenBrand(e);
    setDisplayBrands(false);
    setLeptopID(e.id);

    emitData((prev) => ({
      ...prev,
      brand: e
    }));
    emitErrors((prev) => ({
      ...prev,
      brand: true
    }));

    emitData((prev) => ({
      ...prev,
      cpu: null
    }));
    sessionStorage.setItem("cpuReset", true);
  }

  useEffect(() => {
    if(revalidate && data) {
      handleNameInput();

      emitData((prev) => ({
        ...prev,
        brand: data.brand
      }));
      emitErrors((prev) => ({
        ...prev,
        brand: true
      }));
    }
  }, [revalidate]);

  return (
    <div className="laptopBrandWrapper">
        <div className={`nameInput${!errors.name && show ? " invalid" : ""}`}>
            <label htmlFor="laptopName">ლეპტოპის სახელი</label>
            <input onChange={(e) => setLaptopName(e.target.value)} onBlur={handleNameInput} type="text" name="laptopName" placeholder="HP" value={laptopName ? laptopName : ""} />
            <span>ლათინური ასოები, ციფრები, !@#$%^&*()_+=</span>
        </div>
        <div className={`brandInput${!errors.brand && show ? " invalid" : ""}`}>
            <div onClick={() => setDisplayBrands(!displayBrands)} className={`laptopSelector${displayBrands ? " displaying" : ""}`}><span>{chosenBrand.name ? chosenBrand.name : "ლეპტოპის ბრენდი"}</span><Arrow className={displayBrands ? "displayed" : null} />
            {displayBrands && 
                <div className="laptopOptions">
                    {laptopBrands.map((e, i) => {
                        return <span onClick={() => handleLaptopBrand(e)} key={i}>{e.name}</span>
                    })}
                </div>
            }
            </div>
        </div>
    </div>
  );
};
