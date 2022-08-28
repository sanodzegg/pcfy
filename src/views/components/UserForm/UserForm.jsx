import "./UserForm.css";
import "./UserBasic/UserBasic.css";
import "./UserPosition/UserPosition.css";
import "./UserContact/UserContact.css";

import { ReactComponent as Postman } from "assets/svg/postman.svg";

import { UserBasic } from "./UserBasic/UserBasic";
import { UserPosition } from "./UserPosition/UserPosition";
import { UserContact } from "./UserContact/UserContact";

export const UserForm = ({ setPage }) => {

  

  const handleNext = (e) => {
    e.preventDefault();
    
    sessionStorage.setItem("formPage", 1);
    setPage(1);
  }

  return (
    <div className="userFormWrapper">
      <form>
        <UserBasic />
        <UserPosition />
        <UserContact />
        <div className="btnWrapper">
          <button onClick={(e) => handleNext(e)}>შემდეგი</button>
        </div>
      </form>
      <Postman className="postman" />
    </div>
  );
};
