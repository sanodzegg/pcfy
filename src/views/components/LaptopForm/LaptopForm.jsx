import { useEffect, useState } from "react";
import { LaptopBrand } from "./LaptopBrand/LaptopBrand";
import { SystemForm } from "./SystemForm/SystemForm";
import "./LaptopForm.css";

import { LaptopImg } from "./LaptopImg/LaptopImg";
import { AboutLaptop } from "./AboutLaptop/AboutLaptop";
import { Navigation } from "./Navigation/Navigation";

export const LaptopForm = ({ setPage, emitResponse }) => {

  const [laptopID, setLeptoptID] = useState(null);

  const [image, setImage] = useState(false);
  const [imgObj, setIMGObj] = useState({});
  const [accessErrors, setAccessErrors] = useState(false);
  const [checker, setChecker] = useState(false);
  const [localData, setLocalData] = useState({
    binary: "",
    laptop_name: "",
    laptop_image_info: "",
    laptop_brand_id: null,
    laptop_cpu: null,
    laptop_cpu_cores: null,
    laptop_cpu_threads: null,
    laptop_ram: null,
    laptop_hard_drive_type: "",
    laptop_state: "",
    laptop_purchase_date: "",
    purchase_date_local: "",
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

  const [laptopAboutErrors, setLaptopAboutErrors] = useState({
    date: true,
    price: false,
    state: false
  });

  const allErrors = [image, laptopBrandErrors, laptopAboutErrors, laptopSysErrors];

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
        <LaptopImg err={image} emitImage={setImage} show={accessErrors} emitData={setLocalData} emitIMGObj={setIMGObj} />
        <LaptopBrand errors={laptopBrandErrors} show={accessErrors} emitData={setLocalData} emitErrors={setLaptopBrandErrors} setLeptopID={setLeptoptID} revalidate={checker} />
        <hr className="defaultHr" />
        <SystemForm laptopSet={setLeptoptID} errors={laptopSysErrors} show={accessErrors} ID={laptopID} emitData={setLocalData} emitErrors={setLaptopSysErrors} revalidate={checker} />
        <hr className="defaultHr" />
        <AboutLaptop emitErrors={setLaptopAboutErrors} errors={laptopAboutErrors} show={accessErrors} emitData={setLocalData} revalidate={checker} />
        <Navigation setPage={setPage} setErrors={setAccessErrors} updateChecker={setChecker} errors={allErrors} imgObject={imgObj} emitResponse={emitResponse} />
      </form>
    </div>
  );
};
