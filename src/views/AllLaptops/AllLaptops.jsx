import axios from "axios";
import { useEffect, useState } from "react";

export const AllLaptops = () => {

    const [list, setList] = useState([]);
    const [laptopInfo, setLaptopInfo] = useState([]);

    useEffect(() => {
      const getAll = async () => {
        const res = axios.get("https://pcfy.redberryinternship.ge/api/laptops?token=254c17394feb86133ca156ef9b4d9a91");
        const data = await res;
        if(data) {
            const laptops = data.data;
            setList(laptops.data);
        }
      }

      getAll();
    }, []);

    useEffect(() => {
        if(list.length > 0) {
            const laptopInfoArr = [];
            list.forEach(e => {
                laptopInfoArr.push(e.laptop);
            });
            setLaptopInfo(laptopInfoArr);
        }
    }, [list]);
    

    useEffect(() => {
        console.log(laptopInfo);
    }, [laptopInfo])

  return (
    <div className="allLaptops">
        {laptopInfo.map((e, i) => {
            return <img src={`https://pcfy.redberryinternship.ge/${e.image}`} key={i} />
        })}
    </div>
  );
};
