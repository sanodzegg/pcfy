import { useEffect, useState } from "react";

import "./UserForm.css";
import "./UserBasic/UserBasic.css";
import "./UserPosition/UserPosition.css";
import "./UserContact/UserContact.css";

import { ReactComponent as Postman } from "assets/svg/postman.svg";

import { UserBasic } from "./UserBasic/UserBasic";
import { UserPosition } from "./UserPosition/UserPosition";
import { UserContact } from "./UserContact/UserContact";

export const UserForm = ({ setPage }) => {

  const [showErrs, setShowErrs] = useState(false);
  const [checker, setChecker] = useState(false);

  const [localData, setLocalData] = useState({
    name: "",
    surname: "",
    team: null,
    position: null,
    phone_number: "",
    email: ""
  });

  const [basicErrs, setBasicErrs] = useState({
    firstName: {
      valid: false,
      message: ""
    },
    lastName: {
      valid: false,
      message: ""
    }
  });
  
  const [posErrs, setPosErrs] = useState({
    team: false,
    position: false
  });

  const [contactErrs, setContactErrs] = useState({
    mail: false,
    pn: false
  });

  const handleNext = (e) => {
    e.preventDefault();

    setChecker(true);

    const errObj = {...basicErrs, ...posErrs, ...contactErrs};

    const inner = [];
    Object.values(errObj).map(e => {
      if(typeof e === "object") {
        Object.values(e).filter(i => typeof i === "boolean" && inner.push(i));
      }
      typeof e !== "object" && !e.valid && inner.push(e);
    });

    const invalid = inner.some(e => e === false);

    if(!invalid) {
      sessionStorage.setItem("formPage", 1);
      setPage(1);
    } else setShowErrs(true);
  }

  useEffect(() => {
    if(sessionStorage.getItem("data")) {
      setLocalData(JSON.parse(sessionStorage.getItem("data")));
    }
  }, []);

  useEffect(() => {
    Object.values(localData).forEach(e => {
      if(e) {
        sessionStorage.setItem("data", JSON.stringify(localData));
      }
    });
  }, [localData]);

  return (
    <div className="userFormWrapper">
      <form>
        <UserBasic checker={checker} errs={basicErrs} show={showErrs} setErrs={setBasicErrs} emitData={setLocalData} />
        <UserPosition errs={posErrs} show={showErrs} setErrs={setPosErrs} emitData={setLocalData} />
        <UserContact errs={contactErrs} show={showErrs} setErrs={setContactErrs} emitData={setLocalData} />
        <div className="btnWrapper">
          <button onClick={(e) => handleNext(e)}>შემდეგი</button>
        </div>
      </form>
      <Postman className="postman" />
    </div>
  );
};
