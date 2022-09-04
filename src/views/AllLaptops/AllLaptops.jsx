import { useEffect, useState } from "react";
import "./AllLaptops.css";

import axios from "axios";
import { Laptop } from "./Laptop/Laptop";

import { ReactComponent as Exit } from "assets/svg/exit.svg";
import { ReactComponent as PhoneExit } from "assets/svg/phoneExit.svg";

import { useNavigate } from "react-router-dom";

export const AllLaptops = () => {

  const [phoneWidth, setPhoneWidth] = useState(false);
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAll = async () => {
      const res = axios.get(`https://pcfy.redberryinternship.ge/api/laptops?token=${process.env.REACT_APP_TOKEN}`);
      const data = await res;
      if(data) {
          const laptops = data.data;
          setList(laptops.data);
      }
    }

    getAll();

    handleResize();
  }, []);

  const handleResize = () => {
    window.innerWidth < 850 ? setPhoneWidth(true) : setPhoneWidth(false);
  }

  window.addEventListener("resize", handleResize)

  return (
    <div className="recordings">
      {phoneWidth ? <PhoneExit className="phoneExit" onClick={() => navigate("/")} /> : <Exit onClick={() => navigate("/")} />}
      <h1 className="recordingsHeader">ჩანაწერების სია</h1>
      <div className="laptopList">
        {list.map((e, i) => {
              return <Laptop key={i} imgSrc={e.laptop.image} laptopID={e.laptop.id} laptopName={e.laptop.name}
              firstName={e.user.name} lastName={e.user.surname} />
        })}
      </div>
    </div>
  );
};
