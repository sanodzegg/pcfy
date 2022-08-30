import { useEffect, useState } from "react";
import { LaptopBrand } from "./LaptopBrand/LaptopBrand";
import { SystemForm } from "./SystemForm/SystemForm";
import "./LaptopForm.css";

import { LaptopImg } from "./LaptopImg/LaptopImg";
import { AboutLaptop } from "./AboutLaptop/AboutLaptop";
import { Navigation } from "./Navigation/Navigation";

export const LaptopForm = ({ setPage }) => {

  const [laptopID, setLeptoptID] = useState(null);

  const [image, setImage] = useState(false);
  const [accessErrors, setAccessErrors] = useState(false);
  const [checker, setChecker] = useState(false);

  const [localData, setLocalData] = useState({
    name: "",
    image: "",
    brand: null,
    cpu: null,
    laptop_cpu_cores: null,
    laptop_cpu_threads: null,
    laptop_ram: null,
    hard_drive_type: "",
    laptop_state: "",
    laptop_purchase_date: "",
    laptop_price: null
  });

  const [laptopBrandErrors, setLaptopBrandErrors] = useState({
    name: false,
    brand: false
  });

  const [laptopSysErrors, setLaptopSysErrors] = useState({
    cpu: false,
    cores: false,
    threads: false,
    ram: false,
    memory: false
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    Object.values(localData).forEach(e => {
      if(e) {
        sessionStorage.setItem("laptopData", JSON.stringify(localData));
      }
    });
  }, [localData])

  useEffect(() => {
    if(sessionStorage.getItem("laptopData")) {
      setLocalData(JSON.parse(sessionStorage.getItem("laptopData")));
    }
  }, []);

  return (
    <div className="laptopFormWrapper">
      <form>
        <LaptopImg err={image} emitImage={setImage} show={accessErrors} emitData={setLocalData} />
        <LaptopBrand errors={laptopBrandErrors} show={accessErrors} emitData={setLocalData} emitErrors={setLaptopBrandErrors} setLeptopID={setLeptoptID} revalidate={checker} />
        <hr className="defaultHr" />
        <SystemForm laptopSet={setLeptoptID} errors={laptopSysErrors} show={accessErrors} ID={laptopID} emitData={setLocalData} emitErrors={setLaptopSysErrors} revalidate={checker} />
        <hr className="defaultHr" />
        <AboutLaptop />
        <Navigation setPage={setPage} setErrors={setAccessErrors} updateChecker={setChecker} />
      </form>
    </div>
  );
};
