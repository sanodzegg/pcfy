import "./LaptopInfo.css";

export const LaptopInfo = ({ imgSrc, userData, team, pos }) => {

    const teamName = team && team.filter(e => e.id === userData.team_id)[0].name;
    const posName = pos && pos.filter(e => e.id === userData.position_id)[0].name;

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
                    <p>{userData.name} {userData.surname}</p>
                    <p>{teamName}</p>
                    <p>{posName}</p>
                    <p>ako@redbery.ge</p>
                    <p>+995 583 43 32 24</p>
                </div>
            </div>
        </div>
    );
};
