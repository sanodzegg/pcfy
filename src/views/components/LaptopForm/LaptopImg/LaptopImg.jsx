import { useEffect, useRef, useState } from "react";

import { ReactComponent as ErrorMark } from "assets/svg/error.svg";
import { ReactComponent as CheckMark } from "assets/svg/checkmark.svg";

export const LaptopImg = ({ err, emitImage, show, emitData, emitIMGObj }) => {

    const data = JSON.parse(sessionStorage.getItem("laptopData"));

    const [imgFile, setImgFile] = useState(data?.laptop_image_info ? data.laptop_image_info : "");
    const [base64, setBase64] = useState(data?.binary ? data.binary : "");
    const [showImage, setShowImage] = useState(false);
    
    const [generatedFile, setGeneratedFile] = useState(null);
    const [reupload, setReupload] = useState(false);

    const fileRef = useRef(null);
    const imgRef = useRef(null);
  
    useEffect(() => {
      if(data?.binary) {
        setShowImage(true);
        setReupload(true);
      }
    }, [data]);

    const handleImgUpload = (e) => {
      e.preventDefault();

      fileRef.current.click();
    }
  
    const handleImgChange = async (e) => {
      e.preventDefault();
      const file = fileRef.current.files[0];
      
      emitIMGObj(file);

      setImgFile({ name: file.name, type: file.type, size: file.size });

      if(fileRef.current.files[0]) {
        const base64 = await toBase64(fileRef.current.files[0]);
        setBase64(base64);
        setShowImage(true);
      }

      emitImage(true);
    }

    const getFileFromBase = (string64, fileName, fileType) => {
      const trimmed = fileType === "image/jpeg" ? string64.replace("data:image/jpeg;base64,", "") :
      fileType === "image/png" ? string64.replace("data:image/png;base64,", "") : null;

      try {
        if(trimmed) {
          const imgContent = atob(trimmed);
          const buffer = new ArrayBuffer(imgContent.length);
          const view = new Uint8Array(buffer);
    
    
          for (let n = 0; n < imgContent.length; n++) {
            view[n] = imgContent.charCodeAt(n);
          }
          const type = fileType;
          const blob = new Blob([buffer], { type });
          return new File([blob], fileName, { lastModified: new Date().getTime(), type });
        } else {
          throw new Error("Unsupported Image Type");
        }
      } catch(err) {
        if(err) {
          emitImage(false);
        }
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

    const handleReupload = (e) => {
      e.preventDefault();

      fileRef.current.click();
    }

    useEffect(() => {
      if(imgFile !== "" && base64 !== "") {
        emitData((prev) => ({
          ...prev,
          binary: base64,
          laptop_image_info: imgFile
        }));
        emitImage(true);
      }
      setGeneratedFile(getFileFromBase(base64, imgFile.name, imgFile.type));
    }, [base64]);

    useEffect(() => {
      if(generatedFile) {
        emitIMGObj(generatedFile);
      }
    }, [generatedFile]);

    const imgStyle = showImage ? {"display": "block"} : {"display": "none"};
    const imgName = imgFile?.name?.length < 30 ? `${imgFile?.name},` : `${imgFile?.name?.slice(0, 30)}...`

    return (
      <>
        <div className={`imgUploadWrapper${!err && show ? " invalid" : ""}`}>
            <ErrorMark className={`error${!err && show ? "" : " hidden"}`} />
            {!showImage &&
            <>
            <span>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</span>
            <button onClick={(e) => handleImgUpload(e)}>ატვირთე</button>
            </>
            }
            <input type="file" onChange={(e) => handleImgChange(e)} ref={fileRef} />
            <input type="image" onClick={(e) => e.preventDefault()} style={imgStyle} src={base64 ? base64 : ""} ref={imgRef} />
        </div>
        {reupload &&
          <div className="uploadInfoWrapper">
            <div className="fileInfo">
              <CheckMark />
              <span className="imgName">{imgName}</span>
              <span className="fileSize">{`${(imgFile.size / (1024*1024)).toFixed(2)} mb`}</span>
            </div>
            <button onClick={(e) => handleReupload(e)}>თავიდან ატვირთე</button>
          </div>
        }
      </>
    );
};
