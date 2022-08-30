import { useEffect, useRef, useState } from "react";

import { ReactComponent as ErrorMark } from "assets/svg/error.svg";

export const LaptopImg = ({ err, emitImage, show, emitData }) => {

    const data = JSON.parse(sessionStorage.getItem("laptopData"));

    const [base64, setBase64] = useState(data?.image ? data.image : "");
    const [showImage, setShowImage] = useState(false);

    const fileRef = useRef(null);
    const imgRef = useRef(null);
  
    useEffect(() => {
      if(data?.image) {
        setShowImage(true);
      }
    }, [data]);

    const handleImgUpload = (e) => {
      e.preventDefault();

      fileRef.current.click();
    }
  
    const handleImgChange = async (e) => {
      e.preventDefault();
      
      if(fileRef.current.files[0]) {
        const base64 = await toBase64(fileRef.current.files[0]);
        setBase64(base64);
        setShowImage(true);
      }

      emitImage(true);
    }
    
    const toBase64 = (file) => {
      return new Promise((res, rej) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
  
        fileReader.onload = () => {
          res(fileReader.result);
        };
        fileReader.onerror = (err) => {
          rej(err);
        };
      });
    }

    const handleImgClick = (e) => {
      e.preventDefault();

      fileRef.current.click();
    }
  
    useEffect(() => {
      if(base64 !== "") {
        emitData((prev) => ({
          ...prev,
          image: base64
        }));
      }
    }, [base64]);
  
    const imgStyle = showImage ? {"display": "block"} : {"display": "none"};

    return (
        <div className={`imgUploadWrapper${!err && show ? " invalid" : ""}`}>
            <ErrorMark className={`error${!err && show ? "" : " hidden"}`} />
            {!showImage &&
            <>
            <span>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</span>
            <button onClick={(e) => handleImgUpload(e)}>ატვირთე</button>
            </>
            }
            <input type="file" onChange={(e) => handleImgChange(e)} ref={fileRef} />
            <input type="image" onClick={(e) => handleImgClick(e)} style={imgStyle} src={base64 ? base64 : ""} ref={imgRef} />
        </div>
    );
};
