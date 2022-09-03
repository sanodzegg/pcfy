import "./LaptopAbout.css";

export const LaptopAbout = ({ laptopData }) => {

    const state = laptopData.state === "new" ? "ახალი" : "მეორადი";

    const parsedDate = laptopData.purchase_date && laptopData?.purchase_date.split("-").join(" / ");

    return (
        <div className="laptopAboutWrapper">
            <div className="col">
                <div className="innerCol">
                    <p>ლეპტოპის მდგომარეობა</p>
                    <p>ლეპტოპის ფასი</p>
                </div>
                <div className="innerCol">
                    <p>{state}</p>
                    <p>{laptopData.price} &#8382;</p>
                </div>
            </div>
            {
                laptopData.purchase_date && 
                <div className="col">
                    <p>შეძენის რიცხვი: <span>{parsedDate}</span></p>
                </div>
            }
        </div>
    );
};
