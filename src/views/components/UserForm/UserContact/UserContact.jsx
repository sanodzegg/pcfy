import React from "react";

export const UserContact = () => {
  return (
    <>
        <div className="mail">
          <label htmlFor="mail">მეილი</label>
          <input type="text" name="mail" placeholder="grish666@redberry.ge" />
          <span>უნდა მთავრდებოდეს @redberry.ge-ით</span>
        </div>
        <div className="phoneNum">
          <label htmlFor="pn">ტელეფონის ნომერი</label>
          <input type="text" name="pn" placeholder="+995 598 00 07 01" />
          <span>უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს</span>
        </div>
    </>
  );
};
