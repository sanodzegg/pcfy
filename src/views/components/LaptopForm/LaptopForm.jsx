import { useEffect, useState } from "react";
import { LaptopBrand } from "./LaptopBrand/LaptopBrand";
import { SystemForm } from "./SystemForm/SystemForm";
import "./LaptopForm.css";

import { LaptopImg } from "./LaptopImg/LaptopImg";
import { AboutLaptop } from "./AboutLaptop/AboutLaptop";
import { Navigation } from "./Navigation/Navigation";

export const LaptopForm = ({ setPage }) => {

  const [laptopID, setLeptoptID] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="laptopFormWrapper">
      <form>
        <LaptopImg />
        <LaptopBrand setLeptopID={setLeptoptID} />
        <hr className="defaultHr" />
        <SystemForm ID={laptopID} />
        <hr className="defaultHr" />
        <AboutLaptop />
        <Navigation setPage={setPage}  />
      </form>
    </div>
  );
};
