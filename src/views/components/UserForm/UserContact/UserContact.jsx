import React, { useEffect, useRef, useState } from "react";

export const UserContact = ({ revalidate, errs, show, setErrs, emitData }) => {
  const data = JSON.parse(sessionStorage.getItem("userData"));

  const [showSupport, setShowSupport] = useState(false);

  const [mail, setMail] = useState(data?.email ? data.email : "");
  const [pn, setPN] = useState(data?.phone_number ? data.phone_number : "");

  const handleMail = () => {
    const mailRgx = /^[a-z0-9](\.?[a-z0-9]){2,}@redberry\.ge$/i;

    emitData((prev) => ({ ...prev, email: mail }));
    if(mailRgx.test(mail) && mail.length > 0) {
      setErrs((prev) => ({ ...prev, mail: true }));
    } else {
      setErrs((prev) => ({ ...prev, mail: false }));
    }
  }

  const handlePN = () => {
    const pnRegx = /^(\+?995)?(79\d{7}|5\d{8})$/;
    const pnVal = pn.split(" ").join("");
    
    const pnToSave = pn.replace("+995 ", "");

    emitData((prev) => ({ ...prev, phone_number: `+995 ${pnToSave}` }));
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
    const newval = pn.replace("+995 ", "");
    setPN(`+995 ${newval}`);
  }

  const handlePNFocus = () => {
    const newval = pn.replace("+995 ", "");
    setPN(newval);
  }

  useEffect(() => {
    if(revalidate) {
      handleMail();
      handlePN();
    }
  }, [revalidate]);

  const mailClass = `mail${mail && errs.mail === null ? "" : errs.mail === false && show ? " invalid" : ""}`;
  const pnClass = `phoneNum${pn && errs.pn === null ? "" : errs.pn === false && show ? " invalid" : ""}`;

  return (
    <>
        <div className={mailClass}>
          <label htmlFor="mail">მეილი</label>
          <input onChange={(e) => setMail(e.target.value)} onBlur={handleMail} type="text" name="mail" placeholder="grish666@redberry.ge" value={mail ? mail : ""} />
          <span>უნდა მთავრდებოდეს @redberry.ge-ით</span>
        </div>
        <div className={pnClass}>
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
