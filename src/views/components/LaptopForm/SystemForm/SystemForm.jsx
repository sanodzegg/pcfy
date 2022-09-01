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
  const [selectCPU, setSelectCPU] = useState(data?.laptop_cpu ? data.laptop_cpu : {});

  const [cores, setCores] = useState(data?.laptop_cpu_cores ? data.laptop_cpu_cores : null);
  const [threads, setThreads] = useState(data?.laptop_cpu_threads ? data.laptop_cpu_threads : null);
  const [ram, setRAM] = useState(data?.laptop_ram ? data.laptop_ram : null);

  const ssdRadio = useRef(null);
  const hddRadio = useRef(null);

  const rgx = /\d+/g;
  
  useEffect(() => {
    if(sessionStorage.getItem("cpuReset") !== "false") {
      setSelectCPU({});
    } sessionStorage.setItem("cpuReset", false);
  });

  useEffect(() => {
    if(data?.laptop_brand_id) {
      setCpuAccessible(true);
      laptopSet(data.laptop_brand_id.id);
    }
  }, [data]);

  useEffect(() => {
    setDisplayCPU(false);
    if(ID) {
      const getSelectedCPUData = async () => {
        const response = await axios.get("https://pcfy.redberryinternship.ge/api/cpus");
        const data = await response.data;
        setCpuOptions(data.data);
        setCpuAccessible(true);
      }
      getSelectedCPUData();
    }
    if(ID && ID !== selectCPU.id) {
      setCpuAccessible(false);
    }
  }, [ID]);

  useEffect(() => {
    if(data?.laptop_hard_drive_type) {
      data.laptop_hard_drive_type === "SSD" ? handleSSD() : handleHDD();
    }
  }, []);

  useEffect(() => {
    if(revalidate) {
      handleCPUSelect();
      handleCoresBlur();
      handleThreadsBlur();
      handleRAMBlur();
    }
  }, [revalidate]);


  const handleCPUSelect = (e) => {
    if(!e && data?.laptop_cpu && data?.laptop_cpu.name) {
      setSelectCPU(data.laptop_cpu);

      emitData((prev) => ({ ...prev, laptop_cpu: data.laptop_cpu }));
      emitErrors((prev) => ({ ...prev, cpu: true }));
    } else if (e) {
      setSelectCPU(e);

      emitData((prev) => ({ ...prev, laptop_cpu: e }));
      emitErrors((prev) => ({ ...prev, cpu: true }));
    } else {
      emitErrors((prev) => ({ ...prev, cpu: false }));
    }

    setDisplayCPU(false);
  }

  const handleCoresBlur = () => {
    emitData((prev) => ({ ...prev, laptop_cpu_cores: parseInt(cores) }));
    if(rgx.test(cores) && cores.toString().length > 0) {
      emitErrors((prev) => ({ ...prev, cores: true }));
    } else {
      emitErrors((prev) => ({ ...prev, cores: false }));
    }
  }

  const handleThreadsBlur = () => {
    if(threads) {
      const threadsStr = threads.toString();
    
      emitData((prev) => ({ ...prev, laptop_cpu_threads: parseInt(threads) }));
      if(threadsStr.match(rgx) && threadsStr.length > 0) {
        emitErrors((prev) => ({ ...prev, threads: true }));
      } else {
        emitErrors((prev) => ({ ...prev, threads: false }));
      }
    }
  }

  const handleRAMBlur = () => {
    if(ram) {
      const ramStr = ram.toString();

      emitData((prev) => ({ ...prev, laptop_ram: parseInt(ram) }));
      if(ramStr.match(rgx) && ramStr.length > 0) {
        emitErrors((prev) => ({ ...prev, ram: true }));
      } else {
        emitErrors((prev) => ({ ...prev, ram: false }));
      }
    }
  }

  const handleSSD = () => {
    ssdRadio.current.style.display = "block";
    hddRadio.current.style.display = "none";

    emitData((prev) => ({
      ...prev,
      laptop_hard_drive_type: "SSD"
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
      laptop_hard_drive_type: "HDD"
    }));
    emitErrors((prev) => ({
      ...prev,
      memory: true
    }));
  }

  const classes = {
    cpuClass: `cpuSelector${!data?.laptop_cpu && show && !errors.cpu ? " invalid" : ""}${displayCPU ? " displaying" : ""}${!cpuAccessible ? " disabled" : ""}`,
    coresClass: `cpuCores${!data?.laptop_cpu_cores && show && !errors.cores ? " invalid" : ""}`,
    threadsClass: `cpuThreads${!data?.laptop_cpu_threads && show && !errors.threads ? " invalid" : ""}`,
    ramClass: `laptopRam${!data?.laptop_ram && show && !errors.ram ? " invalid" : ""}`,
    radioClass: `radioWrapper${!data?.laptop_hard_drive_type && show && !errors.memory ? " invalid" : ""}`,
    radioLabel: `radioLabelWrapper${show && !errors.memory ? " flex" : ""}`
  }

  return (
    <div className="systemFormWrapper">
      <div className="formWrapper-row">
        <div onClick={() => setDisplayCPU(!displayCPU)} className={classes.cpuClass}><span>{selectCPU?.name ? selectCPU.name : "CPU"}</span><Arrow className={displayCPU ? "displayed" : null} />
          {displayCPU &&
            <div className="cpuOptions">
                {cpuOptions.map((e, i) => {
                  return <span onClick={() => { handleCPUSelect(e) }} key={i}>{e.name}</span>
                })}
            </div>
          }
        </div>
        <div className={classes.coresClass}>
          <label htmlFor="cores">CPU-ს ბირთვი</label>
          <input onChange={(e) => setCores(e.target.value)} onBlur={handleCoresBlur} type="number" name="cores" placeholder="14" value={cores ? cores : ""} />
          <span>მხოლოდ ციფრები</span>
        </div>
        <div className={classes.threadsClass}>
          <label htmlFor="threads">CPU-ს ნაკადი</label>
          <input onChange={(e) => setThreads(e.target.value)} onBlur={handleThreadsBlur} type="number" name="threads" placeholder="365" value={threads ? threads : ""} />
          <span>მხოლოდ ციფრები</span>
        </div>
      </div>
      <div className="formWrapper-row">
        <div className={classes.ramClass}>
          <label htmlFor="ram">ლეპტოპის RAM (GB)</label>
          <input onChange={(e) => setRAM(e.target.value)} onBlur={handleRAMBlur} type="number" name="ram" placeholder="16" value={ram ? ram : ""} />
          <span>მხოლოდ ციფრები</span>
        </div>
        <div className={classes.radioClass}>
          <div className={classes.radioLabel}>
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
