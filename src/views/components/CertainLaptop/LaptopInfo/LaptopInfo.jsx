import { useState } from "react";
import { useEffect } from "react";
import "./LaptopInfo.css";

export const LaptopInfo = ({ imgSrc, userData, team, pos }) => {

    const teamName = team && team.filter(e => e.id === userData.team_id)[0].name;
    const posName = pos && pos.filter(e => e.id === userData.position_id)[0].name;

    const [phoneWidth, setPhoneWidth] = useState(false);

    useEffect(() => {
        handleResize();
    }, []);

    const handleResize = () => {
        window.innerWidth < 615 ? setPhoneWidth(true) : setPhoneWidth(false);
    }

    window.addEventListener("resize", handleResize);

    const parsed = userData?.phone_number.replace(/[^\dA-Z]/g, '').replace(/(.{3})(.{3})(.{2})(.{2})(.{2})/g, '$1 $2 $3 $4 $5').trim();
    const userName = `${userData.name} ${userData.surname}`;

    return (
        <div className="laptopInfo">
            <div className="IMGWrapper">
                <img src={`https://pcfy.redberryinternship.ge${imgSrc}`} alt="laptop visual" />
            </div>
            <div className="info">
                <div className="col">
                    <p>სახელი:</p>
                    <p>თიმი:</p>
                    <p>პოზიცია:</p>
                    <p>მეილი:</p>
                    <p>ტელ. ნომერი:</p>
                </div>
                <div className="col">
                    <p>{phoneWidth && userName.length > 14 ? `${userName.slice(0, 14)}...` : userName}</p>
                    <p>{teamName}</p>
                    <p>{phoneWidth && posName.length > 14 ? `${posName.slice(0, 14)}...` : posName}</p>
                    <p>{phoneWidth && userData.email.length > 14 ? `${userData.email.slice(0, 14)}...` : userData.email}</p>
                    <p>{`+${parsed}`}</p>
                </div>
            </div>
        </div>
    );
};
