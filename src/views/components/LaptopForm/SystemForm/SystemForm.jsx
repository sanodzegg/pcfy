import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import "./SystemForm.css"

import { ReactComponent as Arrow } from "assets/svg/selectArrow.svg";

export const SystemForm = ({ ID }) => {

  const [displayCPU, setDisplayCPU] = useState(false);
  const [cpuAccessible, setCpuAccessible] = useState(false);

  const [cpuOptions, setCpuOptions] = useState([]);
  const [selectCPU, setSelectCPU] = useState({});

  const cpuSpan = useRef(null);

  const ssdRadio = useRef(null);
  const hddRadio = useRef(null);
  
  const getCertainCPU = (data) => {
    const options = data.filter(e => e.id === ID);
    setCpuOptions(options);
  }

  useEffect(() => {
    if(ID) {
      const getSelectedCPUData = async () => {
        const response = await axios.get("https://pcfy.redberryinternship.ge/api/cpus");
        const data = await response.data;
        getCertainCPU(data.data);
        setCpuAccessible(true);
      }

      getSelectedCPUData();
    }
    cpuSpan.current.innerText = "CPU";
  }, [ID]);

  const handlePosSelect = (e) => {
    setSelectCPU(e);
    setDisplayCPU(false);
  }

  const handleSSD = (e) => {
    ssdRadio.current.style.display = "block";
    hddRadio.current.style.display = "none";
  }

  const handleHDD = () => {
    ssdRadio.current.style.display = "none";
    hddRadio.current.style.display = "block";
  }

  return (
    <div className="systemFormWrapper">
      <div className="formWrapper-row">
        <div onClick={() => setDisplayCPU(!displayCPU)} className={`cpuSelector${displayCPU ? " displaying" : ""}${!cpuAccessible ? " disabled" : ""}`}><span ref={cpuSpan}>{selectCPU.name ? selectCPU.name : "CPU"}</span><Arrow className={displayCPU ? "displayed" : null} />
          {displayCPU &&
            <div className="cpuOptions">
                {cpuOptions.map((e, i) => {
                  return <span onClick={() => handlePosSelect(e)} key={i}>{e.name}</span>
                })}
            </div>
          }
        </div>
        <div className="cpuCores">
          <label htmlFor="cores">CPU-ს ბირთვი</label>
          <input type="number" name="cores" placeholder="14" />
          <span>მხოლოდ ციფრები</span>
        </div>
        <div className="cpuFlow">
          <label htmlFor="flow">CPU-ს ნაკადი</label>
          <input type="number" name="flow" placeholder="365" />
          <span>მხოლოდ ციფრები</span>
        </div>
      </div>
      <div className="formWrapper-row">
        <div className="laptopRam">
          <label htmlFor="ram">ლეპტოპის RAM (GB)</label>
          <input type="number" name="ram" placeholder="16" />
          <span>მხოლოდ ციფრები</span>
        </div>
        <div className="radioWrapper">
          <p>მეხსიერების ტიპი</p>
          <div className="radios">
            <div className="customRadio" onClick={handleSSD}>
              <div className="customRadioWrapper">
                <div className="radioInside" ref={ssdRadio}></div>
              </div>
              <span>SSD</span>
            </div>
            <div className="customRadio" onClick={handleHDD}>
              <div className="customRadioWrapper">
                <div className="radioInside" ref={hddRadio}></div>
              </div>
              <span>HDD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
