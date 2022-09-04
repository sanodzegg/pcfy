import { useEffect, useState } from "react";

import "./UserForm.css";
import "./UserBasic/UserBasic.css";
import "./UserPosition/UserPosition.css";
import "./UserContact/UserContact.css";

import { ReactComponent as Postman } from "assets/svg/postman.svg";

import { UserBasic } from "./UserBasic/UserBasic";
import { UserPosition } from "./UserPosition/UserPosition";
import { UserContact } from "./UserContact/UserContact";

export const UserForm = ({ setPage, emitUserTrue }) => {

  const [checker, setChecker] = useState(false);
  const [showErrs, setShowErrs] = useState(false);
  const [canSend, setCanSend] = useState(false);

  const [localData, setLocalData] = useState({
    name: "",
    surname: "",
    team_id: null,
    position_id: null,
    phone_number: "",
    email: ""
  });

  // error states
  const [basicErrs, setBasicErrs] = useState({
    firstName: {
      valid: null,
      message: ""
    },
    lastName: {
      valid: null,
      message: ""
    }
  });
  const [posErrs, setPosErrs] = useState({
    team: null,
    position: null
  });
  const [contactErrs, setContactErrs] = useState({
    mail: null,
    pn: null
  });

  const handleNext = async (e) => {
    e.preventDefault();
    setChecker(true);
    setShowErrs(true);
    setCanSend(true);
  }

  useEffect(() => {
    const notNull = Object.values(basicErrs).some(e => e.valid || e.valid === false);
    if(notNull) {
      const errObj = {...basicErrs, ...posErrs, ...contactErrs};
      const inner = [];

      Object.values(errObj).map(e => {
        if(e !== null && typeof e === "object") {
          Object.values(e).filter(y => typeof y === "boolean" && inner.push(y));
        } else inner.push(e);
      });

      const invalid = inner.some(e => e !== true);

      const {team_id, position, ...recording} = localData;

      if(localData.team_id && localData.position) {
        recording.team_id = localData.team_id.id;
        recording.position = localData.position.id;
      }

      if(invalid) {
        setCanSend(false);
      } else sessionStorage.setItem("lpav", true);

      if(!invalid && canSend) {
        sessionStorage.setItem("formPage", 1);
        setPage(1);
      }
    }
    
  }, [basicErrs, posErrs, contactErrs, canSend]);

  useEffect(() => {
    if(sessionStorage.getItem("userData")) {
      setLocalData(JSON.parse(sessionStorage.getItem("userData")));
    }
  }, []);

  useEffect(() => {
    Object.values(localData).forEach(e => {
      if(e) {
        sessionStorage.setItem("userData", JSON.stringify(localData));
      }
    });
  }, [localData]);

  return (
    <div className="userFormWrapper">
      <form>
        <UserBasic revalidate={checker} errs={basicErrs} show={showErrs} setErrs={setBasicErrs} emitData={setLocalData} />
        <UserPosition revalidate={checker} errs={posErrs} show={showErrs} setErrs={setPosErrs} emitData={setLocalData} />
        <UserContact revalidate={checker} errs={contactErrs} show={showErrs} setErrs={setContactErrs} emitData={setLocalData} />
        <div className="btnWrapper">
          <button onClick={(e) => handleNext(e)}>შემდეგი</button>
        </div>
      </form>
      <Postman className="postman" />
    </div>
  );
};
