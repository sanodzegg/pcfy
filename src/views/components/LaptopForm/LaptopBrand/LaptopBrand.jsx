import { useEffect, useRef, useState } from "react";
import axios from "axios"

import { ReactComponent as Arrow } from "assets/svg/selectArrow.svg";
import { useOnOutsideClick } from "hooks/useOutside";

export const LaptopBrand = ({ errors, show, emitData, emitErrors, setLeptopID, revalidate }) => {

  const data = JSON.parse(sessionStorage.getItem("laptopData"));

  const [laptopName, setLaptopName] = useState(data?.laptop_name ? data.laptop_name : "");
  const [displayBrands, setDisplayBrands] = useState(false);
  const [laptopBrands, setLaptopBrands] = useState([]);

  const [chosenBrand, setChosenBrand] = useState(data?.laptop_brand_id ? data.laptop_brand_id : {});

  const brandsRef = useRef(null);

  const handleNameInput = () => {
    const regex = /^[a-zA-Z0-9 !@#$%^&*()_+=\"]*$/i;
    emitData((prev) => ({
      ...prev,
      laptop_name: laptopName
    }));
    if(regex.test(laptopName) && laptopName.length >= 2) {
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

  useOnOutsideClick(brandsRef, () => setDisplayBrands(false));

  const handleLaptopBrand = (e) => {
    setChosenBrand(e);
    setDisplayBrands(false);
    setLeptopID(e.id);

    emitData((prev) => ({
      ...prev,
      laptop_brand_id: e
    }));
    emitErrors((prev) => ({
      ...prev,
      brand: true
    }));
  }

  useEffect(() => {
    if(revalidate && data) {
      handleNameInput();

      if(data?.laptop_brand_id) {
        emitData((prev) => ({
          ...prev,
          laptop_brand_id: data.laptop_brand_id
        }));
        emitErrors((prev) => ({
          ...prev,
          brand: true
        }));
      }
    }
  }, [revalidate]);

  const classes = {
    nameInput: `nameInput${!data?.laptop_brand_name && !errors.name && show ? " invalid" : ""}`,
    brandInput: `brandInput${!data?.laptop_brand_id && !errors.brand && show ? " invalid" : ""}`
  }

  return (
    <div className="laptopBrandWrapper">
        <div className={classes.nameInput}>
            <label htmlFor="laptopName">ლეპტოპის სახელი</label>
            <input onChange={(e) => setLaptopName(e.target.value)} onBlur={handleNameInput} type="text" name="laptopName" placeholder="HP" value={laptopName ? laptopName : ""} />
            <span>ლათინური ასოები, ციფრები, !@#$%^&*()_+=</span>
        </div>
        <div className={classes.brandInput}>
            <div ref={brandsRef} onClick={() => setDisplayBrands(!displayBrands)} className={`laptopSelector${displayBrands ? " displaying" : ""}`}><span>{chosenBrand.name ? chosenBrand.name : "ლეპტოპის ბრენდი"}</span><Arrow className={displayBrands ? "displayed" : null} />
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
