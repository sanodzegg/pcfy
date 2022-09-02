import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CertainLaptop.css";

import axios from "axios";

import { ReactComponent as Exit } from "assets/svg/exit.svg";

import { LaptopInfo } from "views/components/CertainLaptop/LaptopInfo/LaptopInfo";
import { LaptopSys } from "views/components/CertainLaptop/LaptopSys/LaptopAbout";
import { LaptopAbout } from "views/components/CertainLaptop/LaptopAbout/LaptopAbout";

let team = null;
let pos = null;
let brand = null;

const getData = async () => {
    const endpoints = {
        teams: "https://pcfy.redberryinternship.ge/api/teams",
        positions: "https://pcfy.redberryinternship.ge/api/positions",
        brands: "https://pcfy.redberryinternship.ge/api/brands"
    }

    await Promise.all(Object.values(endpoints).map((e) => axios.get(e))).then(
        axios.spread((teams, positions, brands) => {
            team = teams.data.data;
            pos = positions.data.data;
            brand = brands.data.data
        })
    );
}

getData();

export const CertainLaptop = () => {

    const [laptopInfo, setLaptopInfo] = useState(null);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const getCertainLaptop = async () => {
            const res = await axios.get(`https://pcfy.redberryinternship.ge/api/laptop/${params.id}?token=254c17394feb86133ca156ef9b4d9a91`);
            const data = await res.data.data;
            setLaptopInfo(data);
        }

        getCertainLaptop();
    }, [params]);

    return (
        <div className="certainLaptopWrapper">
            <Exit onClick={() => navigate("/recordings")} />
            <h1>ლეპტოპის ინფო</h1>
            <div className="certainLaptopWrapper">
                {
                    laptopInfo && 
                    <>
                        <LaptopInfo imgSrc={laptopInfo.laptop.image} userData={laptopInfo.user} team={team} pos={pos} />
                        <hr />
                        <LaptopSys laptopData={laptopInfo.laptop} brand={brand} />
                        <hr />
                        <LaptopAbout laptopData={laptopInfo.laptop} />
                    </>
                }
            </div>
        </div>
    );
};
