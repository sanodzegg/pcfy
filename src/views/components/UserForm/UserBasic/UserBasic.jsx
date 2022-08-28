import { useEffect, useState } from "react";

export const UserBasic = () => {

  const [value, setValue] = useState("");

  // useEffect(() => {
  //   console.log(value.match(/[ა-ზ]/g));
  // }, [value]);

  return (
    <div className="userFN">
        <div>
            <label htmlFor="fname">სახელი</label>
            <input onChange={(e) => setValue(e.target.value)} type="text" placeholder="გრიშა" name="fname" value={value !== "" ? value : ""} />
            <span>მინიმუმ 2 სიმბოლო, ქართული ასოები</span>
        </div>
        <div>
            <label htmlFor="lname">გვარი</label>
            <input type="text" placeholder="ბაგრატიონი" name="lname" />
            <span>მინიმუმ 2 სიმბოლო, ქართული ასოები</span>
        </div>
    </div>
  );
};
