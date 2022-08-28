import { ReactComponent as Arrow } from "assets/svg/selectArrow.svg";

import { useEffect, useState } from "react";
import axios from "axios";

export const UserPosition = () => {

    const [displayTeam, setDisplayTeam] = useState(false);
    const [displayPos, setDisplayPos] = useState(false);
    const [posAccessible, setPosAccessible] = useState(false);
  
    const [selectedTeam, setSelectedTeam] = useState({});
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
    }
  
    const handlePosSelect = (e) => {
      setSelectedPos(e);
      setDisplayPos(false);
    }
  
    const setPositions = (data) => {
      const options = data.filter((e) => e.team_id === selectedTeam.id);
      setOptionsData(options);
  
      console.log(options);
    }
  
    useEffect(() => {
      const getPositions = async () => {
        if(selectedTeam.id) {
          const response = await axios.get("https://pcfy.redberryinternship.ge/api/positions");
          const data = await response.data;
          setPositions(data.data);
        }
      }
  
      getPositions();
    }, [selectedTeam]);

    return (
        <>
            <div onClick={() => setDisplayTeam(!displayTeam)} className={`teamSelector${displayTeam ? " displaying" : ""}`}><span>{selectedTeam.name ? selectedTeam.name : "თიმი"}</span><Arrow className={displayTeam ? "displayed" : null} />
                {displayTeam && 
                    <div className="teamOptions">
                    {teamData.map((e, i) => {
                        return <span onClick={() => handleTeamSelect(e)} key={i}>{e.name}</span>
                    })}
                    </div>}
            </div>
            <div onClick={() => setDisplayPos(!displayPos)} className={`posSelector${displayPos ? " displaying" : ""}${!posAccessible ? " disabled" : ""}`}><span>{selectedPos.name ? selectedPos.name : "პოზიცია"}</span><Arrow className={displayTeam ? "displayed" : null} />
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
