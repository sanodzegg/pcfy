import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import "./SystemForm.css"

import { ReactComponent as Arrow } from "assets/svg/selectArrow.svg";

import { ReactComponent as ErrorMark } from "assets/svg/error.svg";

export const SystemForm = ({ laptopSet, errors, show, ID, emitData, emitErrors, revalidate }) => {

  const data = JSON.parse(sessionStorage.getItem("laptopData"));

  const [displayCPU, setDisplayCPU] = useState(false);
  const [cpuAccessible, setCpuAccessible] = useState(false);

  const [cpuOptions, setCpuOptions] = useState([]);
  const [selectCPU, setSelectCPU] = useState(data?.cpu ? data.cpu : {});

  const [cores, setCores] = useState(data?.laptop_cpu_cores ? data.laptop_cpu_cores : null);
  const [threads, setThreads] = useState(data?.laptop_cpu_threads ? data.laptop_cpu_threads : null);
  const [ram, setRAM] = useState(data?.laptop_ram ? data.laptop_ram : null);

  const ssdRadio = useRef(null);
  const hddRadio = useRef(null);

  const rgx = /\d+/g;
  
  const getCertainCPU = (data) => {
    const options = data.filter(e => e.id === ID);
    setCpuOptions(options);
  }

  useEffect(() => {
    if(data?.brand) {
      setCpuAccessible(true);
      laptopSet(data.brand.id);
    }
  }, [data]);

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
  }, [ID]);

  const handleCPUSelect = (e) => {
    if(data?.cpu && data?.cpu.name) {
      setSelectCPU(data.cpu);
      emitData((prev) => ({
        ...prev,
        cpu: data.cpu
      }));
    } else {
      setSelectCPU(e);
      emitData((prev) => ({
        ...prev,
        cpu: e
      }));
    }

    setDisplayCPU(false);
    emitErrors((prev) => ({
      ...prev,
      cpu: true
    }));
  }

  useEffect(() => {
    if(sessionStorage.getItem("cpuReset") !== "false") {
      setSelectCPU({});
    } sessionStorage.setItem("cpuReset", false);
  });

  const handleCoresBlur = () => {
    emitData((prev) => ({
      ...prev,
      laptop_cpu_cores: parseInt(cores)
    }));
    if(rgx.test(cores) && cores.toString().length > 0) {
      emitErrors((prev) => ({
        ...prev,
        cores: true
      }));
    } else {
      emitErrors((prev) => ({
        ...prev,
        cores: false
      }));
    }
  }

  const handleThreadsBlur = () => {
    emitData((prev) => ({
      ...prev,
      laptop_cpu_threads: parseInt(threads)
    }));
    if(rgx.test(threads) && threads.toString().length > 0) {
      emitErrors((prev) => ({
        ...prev,
        threads: true
      }));
    } else {
      emitErrors((prev) => ({
        ...prev,
        threads: false
      }));
    }
  }

  const handleRAMBlur = () => {
    emitData((prev) => ({
      ...prev,
      laptop_ram: parseInt(ram)
    }));
    if(rgx.test(ram) && ram.toString().length > 0) {
      emitErrors((prev) => ({
        ...prev,
        ram: true
      }));
    } else {
      emitErrors((prev) => ({
        ...prev,
        ram: false
      }));
    }
  }

  useEffect(() => {
    if(data?.hard_drive_type) {
      data.hard_drive_type === "SSD" ? ssdRadio.current.style.display = "block" : hddRadio.current.style.display = "block";
    }
  }, []);

  const handleSSD = () => {
    ssdRadio.current.style.display = "block";
    hddRadio.current.style.display = "none";

    emitData((prev) => ({
      ...prev,
      hard_drive_type: "SSD"
    }));
    emitErrors((prev) => ({
      ...prev,
      memory: true
    }));
  }

  const handleHDD = () => {
    ssdRadio.current.style.display = "none";
    hddRadio.current.style.display = "block";

    emitData((prev) => ({
      ...prev,
      hard_drive_type: "HDD"
    }));
    emitErrors((prev) => ({
      ...prev,
      memory: true
    }));
  }

  useEffect(() => {
    if(revalidate) {
      handleCPUSelect();
      handleCoresBlur();
      handleThreadsBlur();

    }
  }, [revalidate]);

  return (
    <div className="systemFormWrapper">
      <div className="formWrapper-row">
        <div onClick={() => setDisplayCPU(!displayCPU)} className={`cpuSelector${show && !errors.cpu ? " invalid" : ""}${displayCPU ? " displaying" : ""}${!cpuAccessible ? " disabled" : ""}`}><span>{selectCPU?.name ? selectCPU.name : "CPU"}</span><Arrow className={displayCPU ? "displayed" : null} />
          {displayCPU &&
            <div className="cpuOptions">
                {cpuOptions.map((e, i) => {
                  return <span onClick={() => { handleCPUSelect(e) }} key={i}>{e.name}</span>
                })}
            </div>
          }
        </div>
        <div className={`cpuCores${show && !errors.cores ? " invalid" : ""}`}>
          <label htmlFor="cores">CPU-ს ბირთვი</label>
          <input onChange={(e) => setCores(e.target.value)} onBlur={handleCoresBlur} type="number" name="cores" placeholder="14" value={cores ? cores : ""} />
          <span>მხოლოდ ციფრები</span>
        </div>
        <div className={`cpuThreads${show && !errors.threads ? " invalid" : ""}`}>
          <label htmlFor="threads">CPU-ს ნაკადი</label>
          <input onChange={(e) => setThreads(e.target.value)} onBlur={handleThreadsBlur} type="number" name="threads" placeholder="365" value={threads ? threads : ""} />
          <span>მხოლოდ ციფრები</span>
        </div>
      </div>
      <div className="formWrapper-row">
        <div className={`laptopRam${show && !errors.ram ? " invalid" : ""}`}>
          <label htmlFor="ram">ლეპტოპის RAM (GB)</label>
          <input onChange={(e) => setRAM(e.target.value)} onBlur={handleRAMBlur} type="number" name="ram" placeholder="16" value={ram ? ram : ""} />
          <span>მხოლოდ ციფრები</span>
        </div>
        <div className={`radioWrapper${show && !errors.memory ? " invalid" : ""}`}>
          <div className={`radioLabelWrapper${show && !errors.memory ? " flex" : ""}`}>
            <p>მეხსიერების ტიპი</p>
            {(show && !errors.memory) && <ErrorMark className="error" />}
          </div>
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
