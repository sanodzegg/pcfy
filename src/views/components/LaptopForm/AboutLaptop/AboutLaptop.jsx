import "./AboutLaptop.css";

export const AboutLaptop = () => {
  return (
    <div className="aboutLaptopWrapper">
        <div className="aboutLaptop-col">
            <div className="dateInput">
                <label htmlFor="date">შეძენის რიცხვი (არჩევითი)</label>
                <input type="text" name="date" placeholder="დდ / თთ / წწწწ" />
            </div>
            <div className="priceInput">
                <label htmlFor="price">ლეპტოპის ფასი</label>
                <input type="number" name="price" placeholder="0000" />
                <span>მხოლოდ ციფრები</span>
            </div>
        </div>  
        <div className="aboutLaptop-col">
            <div className="radioWrapper">
            <p>მეხსიერების ტიპი</p>
            <div className="radios">
                <div className="customRadio">
                <div className="customRadioWrapper">
                    <div className="radioInside"></div>
                </div>
                <span>ახალი</span>
                </div>
                <div className="customRadio">
                <div className="customRadioWrapper">
                    <div className="radioInside"></div>
                </div>
                <span>მეორადი</span>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
};
