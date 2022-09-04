import { useCallback, useEffect, useRef, useState } from "react";

import { ReactComponent as ErrorMark } from "assets/svg/error.svg";
import { ReactComponent as CheckMark } from "assets/svg/checkmark.svg";
import { ReactComponent as PhoneImg } from "assets/svg/phoneImgUpload.svg";

export const LaptopImg = ({ err, emitImage, show, emitData, emitIMGObj }) => {

    const data = JSON.parse(sessionStorage.getItem("laptopData"));
    const [phoneWidth, setPhoneWidth] = useState(false);

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

    const handleResize = () => {
      window.innerWidth < 445 ? setPhoneWidth(true) : setPhoneWidth(false);
    }

    const handleDrop = (e) => {
      e.preventDefault();

      const dt = e.dataTransfer;
      if(dt) {
        const files = dt.files;
        handleImgChange(files[0]);
      }
    }

    useEffect(() => {
      handleResize();
    }, []);

    const handleImgUpload = (e) => {
      e.preventDefault();

      fileRef.current.click();
    }
    const handleImgChange = async (fileArg) => {
      const file = fileArg;
      
      emitIMGObj(file);

      setImgFile({ name: file.name, type: file.type, size: file.size });

      if(file) {
        const base64 = await toBase64(file);
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

    const PhoneFileInfo = () => {
      return (
        <div className="fileInfoWrapper">
          <span className="imgName">{`${imgName.slice(0, 10)}...`}</span>
          <span className="fileSize">{`${(imgFile.size / (1024*1024)).toFixed(2)} mb`}</span>
        </div>
      )
    }

    const DefaultFileInfo = () => {
      return (
        <>
          <span className="imgName">{imgName}</span>
          <span className="fileSize">{`${(imgFile.size / (1024*1024)).toFixed(2)} mb`}</span>
        </>
      )
    }

    window.addEventListener("resize", handleResize);

    const imgStyle = showImage ? {"display": "block"} : {"display": "none"};
    const imgName = imgFile?.name?.length < 15 ? `${imgFile?.name},` : `${imgFile?.name?.slice(0, 15)}...`
    const imgUploadClass = `imgUploadWrapper${!err && show ? " invalid" : phoneWidth ? " pnUpload" : ""}`;

    return (
      <>
        <div onDrop={(e) => handleDrop(e)} onDragOver={(e) => e.preventDefault()} className={imgUploadClass} onClick={() => phoneWidth && fileRef.current.click()}>
            <ErrorMark className={`error${!err && show ? "" : " hidden"}`} />
            {!showImage &&
            <>
            {phoneWidth && <PhoneImg />}
            <span>{phoneWidth ? "ლეპტოპის ფოტოს ატვირთვა" : "ჩააგდე ან ატვირთე ლეპტოპის ფოტო"}</span>
            <button onClick={(e) => handleImgUpload(e)}>ატვირთე</button>
            </>
            }
            <input accept="image/*" type="file" onChange={(e) => handleImgChange(fileRef.current.files[0])} ref={fileRef} />
            <input type="image" onClick={(e) => e.preventDefault()} style={imgStyle} src={base64 ? base64 : ""} ref={imgRef} />
        </div>
        {reupload &&
          <div className="uploadInfoWrapper">
            <div className="fileInfo">
              <CheckMark />
              {phoneWidth ? <PhoneFileInfo /> : <DefaultFileInfo />}
            </div>
            <button onClick={(e) => handleReupload(e)}>თავიდან ატვირთე</button>
          </div>
        }
      </>
    );
};
