import "./LaptopSys.css";

export const LaptopSys = ({ laptopData, brand }) => {
    const brandName = brand && brand.filter(e => e.id === laptopData.brand_id)[0].name;

    return (
        <div className="laptopSysWrapper">
            <div className="col">
                <div className="innerCol">
                    <p>ლეპტოპის სახელი:</p>
                    <p>ლეპტოპის ბრენდი:</p>
                    <p>RAM:</p>
                    <p>მეხსიერების ტიპი:</p>
                </div>
                <div className="innerCol">
                    <p>{laptopData.name}</p>
                    <p>{brandName}</p>
                    <p>{laptopData.ram}</p>
                    <p>{laptopData.hard_drive_type}</p>
                </div>
            </div>
            <div className="col">
            <div className="innerCol">
                    <p>ლეპტოპის სახელი:</p>
                    <p>ლეპტოპის ბრენდი:</p>
                    <p>RAM:</p>
                    <p>მეხსიერების ტიპი:</p>
                </div>
                <div className="innerCol">
                    <p>{laptopData.name}</p>
                    <p>{brandName}</p>
                    <p>{laptopData.ram}</p>
                    <p>{laptopData.hard_drive_type}</p>
                </div>
            </div>
        </div>
    );
};
