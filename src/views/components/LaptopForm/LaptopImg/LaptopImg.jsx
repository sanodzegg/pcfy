import { useEffect, useRef, useState } from "react";

export const LaptopImg = () => {

    const [base64, setBase64] = useState("");
    const [showImage, setShowImage] = useState(false);
    
    const fileRef = useRef(null);
    const imgRef = useRef(null);
  
    const handleImgUpload = (e) => {
      e.preventDefault();

      fileRef.current.click();
    }
  
    const handleImgChange = async () => {
      if(fileRef.current.files[0]) {
        const base64 = await toBase64(fileRef.current.files[0]);
        setBase64(base64);
        setShowImage(true);
      }
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
  
    useEffect(() => {
      if(base64 !== "") {
        console.log(base64);
      }
    }, [base64]);
  
    const imgStyle = showImage ? {"display": "block"} : {"display": "none"};

    return (
        <div className="imgUploadWrapper">
            {!showImage &&
            <>
            <span>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</span>
            <button onClick={(e) => handleImgUpload(e)}>ატვირთე</button>
            </>
            }
            <input type="file" onChange={handleImgChange} ref={fileRef} />
            <input type="image" style={imgStyle} src={base64 && base64} ref={imgRef} />
        </div>
    );
};
