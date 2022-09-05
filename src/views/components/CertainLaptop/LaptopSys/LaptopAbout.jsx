import { useEffect, useState } from "react";
import "./LaptopSys.css";

export const LaptopSys = ({ laptopData, brand }) => {

    const [phoneWidth, setPhoneWidth] = useState(false);

    useEffect(() => {
        handleResize();
    }, []);

    const handleResize = () => {
        window.innerWidth < 615 ? setPhoneWidth(true) : setPhoneWidth(false);
    }

    window.addEventListener("resize", handleResize);

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
                    <p>{phoneWidth && laptopData.name.length > 14 ? `${laptopData.name.slice(0, 14)}...` : laptopData.name}</p>
                    <p>{brandName}</p>
                    <p>{laptopData.ram}</p>
                    <p>{laptopData.hard_drive_type}</p>
                </div>
            </div>
            <div className="col">
            <div className="innerCol">
                    <p>CPU:</p>
                    <p>CPU-ს ბირთვი:</p>
                    <p>CPU-ს ნაკადი:</p>
                </div>
                <div className="innerCol">
                    <p>{laptopData.cpu.name}</p>
                    <p>{laptopData.cpu.cores}</p>
                    <p>{laptopData.cpu.threads}</p>
                </div>
            </div>
        </div>
    );
};
