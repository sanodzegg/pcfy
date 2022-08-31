import { ReactComponent as Arrow } from "assets/svg/selectArrow.svg";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const UserPosition = ({ revalidate, errs, show, setErrs, emitData }) => {
    const data = JSON.parse(sessionStorage.getItem("userData"));
    const accessible = sessionStorage.getItem("accessible") ? true : false;

    const [displayTeam, setDisplayTeam] = useState(false);
    const [displayPos, setDisplayPos] = useState(false);
    const [posAccessible, setPosAccessible] = useState(accessible ? accessible : false);
  
    const [selectedTeam, setSelectedTeam] = useState(data?.team_id ? data.team_id : {});
    const [selectedPos, setSelectedPos] = useState(data?.position_id ? data.position_id : {});
  
    const [teamData, setTeamData] = useState([]);
    const [optionsData, setOptionsData] = useState([]);

    const teamRef = useRef(null);
    const posRef = useRef(null);

    useEffect(() => {
      const getTeams = async () => {
        const response = await axios.get("https://pcfy.redberryinternship.ge/api/teams");
        const data = await response.data;
        setTeamData(data.data);
      }
  
      getTeams();
  
      window.scrollTo(0, 0);
    }, []);

    const handleTeamSelect = (e) => {
      setSelectedTeam(e);
      setDisplayTeam(false);
      setPosAccessible(true);

      setSelectedPos({});
      
      if(data && data.position_id) {
        data.position_id.name = null;
      }

      emitData((prev) => ({ ...prev, position_id: {} }));

      sessionStorage.setItem("accessible", true);

      setErrs((prev) => ({
        ...prev,
        team: true
      }));


      emitData((prev) => ({ ...prev, team_id: e }));

      setErrs((prev) => ({
        ...prev,
        position: false
      }));
    }
  
    const handlePosSelect = (e) => {
      setSelectedPos(e);
      setDisplayPos(false);

      setErrs((prev) => ({
        ...prev,
        position: true
      }));


      emitData((prev) => ({ ...prev, position_id: e }));
    }
  
    const setPositions = (data) => {
      const options = data.filter((e) => e.team_id === selectedTeam.id);
      setOptionsData(options);
    }
  
    useEffect(() => {
      const getPositions = async () => {
        if(selectedTeam.id || data?.position_id) {
          const response = await axios.get("https://pcfy.redberryinternship.ge/api/positions");
          const data = await response.data;
          setPositions(data.data);
        }
      }
  
      getPositions();
    }, [selectedTeam]);

    useEffect(() => {
      if(revalidate && data) {
        emitData((prev) => ({ ...prev, position_id: data?.team_id }));
        setErrs((prev) => ({
          ...prev,
          team: true
        }));
        emitData((prev) => ({ ...prev, position_id: data?.position_id }));
        setErrs((prev) => ({
          ...prev,
          position: true
        }));
      }
    }, [revalidate]);

    
    const posArr = Object.values(selectedPos).length;

    const teamClass = `teamSelector${!data?.team_id && show && (errs.team === null || errs.team) ? " invalid" : ""}`;
    const posClass = `posSelector${(!posArr || posArr === 0) && show && (errs.position === null || errs.position) ? " invalid" : ""}${!posAccessible ? " disabled" : ""}`

    return (
        <>
            <div ref={teamRef} onClick={() => setDisplayTeam(!displayTeam)} className={teamClass}><span>{selectedTeam.name ? selectedTeam.name : data?.team_id ? data.team_id?.name : "თიმი"}</span><Arrow className={displayTeam ? "displayed" : null} />
                {displayTeam && 
                    <div className="teamOptions">
                    {teamData.map((e, i) => {
                        return <span onClick={() => handleTeamSelect(e)} key={i}>{e.name}</span>
                    })}
                    </div>}
            </div>
            <div ref={posRef} onClick={() => setDisplayPos(!displayPos)} className={posClass}><span>{selectedPos.name ? selectedPos.name : data?.position_id?.name ? data.position_id.name : "პოზიცია"}</span><Arrow className={displayTeam ? "displayed" : null} />
                {displayPos && 
                <div className="posOptions">
                    {optionsData.map((e, i) => {
                    return <span onClick={() => handlePosSelect(e)} key={i}>{e.name}</span>
                    })}
                </div>}
            </div>
        </>
    );
};
