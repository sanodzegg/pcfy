import "./LaptopAbout.css";

export const LaptopAbout = ({ laptopData }) => {

    const state = laptopData.state === "new" ? "ახალი" : "მეორადი";

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
                    <p>შეძენის რიცხვი: <span>{laptopData.purchase_date}</span></p>
                </div>
            }
        </div>
    );
};
