import React, { useEffect, useState } from "react";

const data = JSON.parse(sessionStorage.getItem("data"));

export const UserContact = ({ checker, errs, show, setErrs, emitData }) => {

  const [showSupport, setShowSupport] = useState(false);

  const [mail, setMail] = useState(data.email ? data.email : "");
  const [pn, setPN] = useState(data.phone_number ? data.phone_number : "");

  const handleMail = () => {
    const mailRgx = /^[a-z0-9](\.?[a-z0-9]){2,}@redberry\.ge$/i;

    emitData((prev) => ({ ...prev, email: mail }));
    if(mailRgx.test(mail)) {
      setErrs((prev) => ({ ...prev, mail: true }));
    } else {
      setErrs((prev) => ({ ...prev, mail: false }));
    }
  }

  const handlePN = () => {
    emitData((prev) => ({ ...prev, phone_number: `+995 ${pn}` }));
    const pnRegx = /^(\+?995)?(79\d{7}|5\d{8})$/;
    const pnVal = pn.split(" ").join("");
    if(pnRegx.test(pnVal)) {
      setErrs((prev) => ({ ...prev, pn: true }));
    } else {
      setErrs((prev) => ({ ...prev, pn: false }));
    }
  }

  const handlePNChange = (val) => {
    const parsed = val.replace(/[^\dA-Z]/g, '').replace(/(.{3})/g, '$1 ').trim();
    setPN(parsed);
  }

  const handlePNBlur = () => {
    const newval = pn;
    setPN(`+995 ${newval}`);
  }

  const handlePNFocus = () => {
    const newval = pn.replace("+995 ", "");
    setPN(newval);
  }

  // useEffect(() => {
  //   if(checker) {
  //     handleMail();
  //     handlePN();
  //   }
  // }, [checker]);

  return (
    <>
        <div className={`mail${show && !errs.mail ? " invalid" : ""}`}>
          <label htmlFor="mail">მეილი</label>
          <input onChange={(e) => setMail(e.target.value)} onBlur={handleMail} type="text" name="mail" placeholder="grish666@redberry.ge" value={mail ? mail : ""} />
          <span>უნდა მთავრდებოდეს @redberry.ge-ით</span>
        </div>
        <div className={`phoneNum${show && !errs.pn ? " invalid" : ""}`}>
          <label htmlFor="pn">ტელეფონის ნომერი</label>
          <div className="pnWrapper">
            <input maxLength={11} onFocus={() => {setShowSupport(true); handlePNFocus()}} onChange={(e) => handlePNChange(e.target.value)} onBlur={() => {setShowSupport(false); handlePN(); handlePNBlur()}} type="text" name="pn" placeholder="+995 598 00 07 01" value={pn ? pn : ""} />
            {showSupport && <span className="pnsup">+995</span>}
          </div>
          <span>უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს</span>
        </div>
    </>
  );
};
