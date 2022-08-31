import { useEffect, useRef, useState } from "react";

import { ReactComponent as ErrorMark } from "assets/svg/error.svg";

export const LaptopImg = ({ err, emitImage, show, emitData }) => {

    const data = JSON.parse(sessionStorage.getItem("laptopData"));

    const [imgUrl, setImgUrl] = useState(data?.laptop_image ? data.laptop_image : "");
    const [base64, setBase64] = useState(data?.binary ? data.binary : "");
    const [showImage, setShowImage] = useState(false);

    const fileRef = useRef(null);
    const imgRef = useRef(null);
  
    useEffect(() => {
      if(data?.laptop_image) {
        setShowImage(true);
      }
    }, [data]);

    const handleImgUpload = (e) => {
      e.preventDefault();

      fileRef.current.click();
    }
  
    const handleImgChange = async (e) => {
      e.preventDefault();
      const file = fileRef.current.files[0];
      const path = file.name;
      const type = file.type;
      
      const str = `${path};type=${type}`
      setImgUrl(str);

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
      if(imgUrl !== "" && base64 !== "") {
        emitData((prev) => ({
          ...prev,
          laptop_image: imgUrl,
          binary: base64
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
