import { ReactComponent as Arrow } from "assets/svg/selectArrow.svg";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

const data = JSON.parse(sessionStorage.getItem("data"));
const accessible = sessionStorage.getItem("accessible") ? true : false;

export const UserPosition = ({ checker, errs, show, setErrs, emitData }) => {

    const [displayTeam, setDisplayTeam] = useState(false);
    const [displayPos, setDisplayPos] = useState(false);
    const [posAccessible, setPosAccessible] = useState(accessible ? accessible : false);
  
    const [selectedTeam, setSelectedTeam] = useState(data.team ? data.team : {});
    const [selectedPos, setSelectedPos] = useState({});
  
    const [teamData, setTeamData] = useState([]);
    const [optionsData, setOptionsData] = useState([]);

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
      data.position.name = null;

      emitData((prev) => ({ ...prev, position: {} }));

      sessionStorage.setItem("accessible", true);

      setErrs((prev) => ({
        ...prev,
        team: true
      }));

      emitData((prev) => ({ ...prev, team: e }));

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

      emitData((prev) => ({ ...prev, position: e }));
    }
  
    const setPositions = (data) => {
      const options = data.filter((e) => e.team_id === selectedTeam.id);
      setOptionsData(options);
    }
  
    useEffect(() => {
      const getPositions = async () => {
        if(selectedTeam.id || data.position) {
          const response = await axios.get("https://pcfy.redberryinternship.ge/api/positions");
          const data = await response.data;
          setPositions(data.data);
        }
      }
  
      getPositions();
    }, [selectedTeam, data]);

    const teamClass = `teamSelector${show && !errs.team ? " invalid" : ""}`;
    const posClass = `posSelector${show && !errs.position ? " invalid" : ""}${!posAccessible ? " disabled" : ""}`

    return (
        <>
            <div onClick={() => setDisplayTeam(!displayTeam)} className={teamClass}><span>{selectedTeam.name ? selectedTeam.name : data.team ? data.team.name : "თიმი"}</span><Arrow className={displayTeam ? "displayed" : null} />
                {displayTeam && 
                    <div className="teamOptions">
                    {teamData.map((e, i) => {
                        return <span onClick={() => handleTeamSelect(e)} key={i}>{e.name}</span>
                    })}
                    </div>}
            </div>
            <div onClick={() => setDisplayPos(!displayPos)} className={posClass}><span>{selectedPos.name ? selectedPos.name : data.position.name ? data.position.name : "პოზიცია"}</span><Arrow className={displayTeam ? "displayed" : null} />
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
