import { useEffect, useState } from "react";
import axios from "axios"

import { ReactComponent as Arrow } from "assets/svg/selectArrow.svg";

export const LaptopBrand = ({ setLeptopID }) => {

    const [displayBrands, setDisplayBrands] = useState(false);
    const [laptopBrands, setLaptopBrands] = useState([]);
  
    const [chosenBrand, setChosenBrand] = useState({});
  
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
    }

  return (
    <div className="laptopName">
        <div>
            <label htmlFor="laptopName">ლეპტოპის სახელი</label>
            <input type="text" name="laptopName" placeholder="HP" />
            <span>ლათინური ასოები, ციფრები, !@#$%^&*()_+=</span>
        </div>
        <div>
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
