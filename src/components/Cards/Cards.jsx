import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";
import { AppContext } from "../../context/appContext";

import { Card } from "../Card/Card";
import { NotFound } from "../NotFound/NotFound";



export const Cards = ({ goods }) => {

    const { isLoading } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <>
            {!goods.length && !isLoading
                ? (<NotFound
                    title={"Простите, по вашему запросу товаров не найдено."}
                    buttonText={"На главную"}
                    buttonAction={() => navigate("/")}
                >
                </NotFound>)
                : (<div className={style.cards}>
                    {goods?.map(({ __v, ...dataItem }) => {
                        return (<Card key={`${dataItem._id}`} {...dataItem} />)
                    })}
                </div>)
            }
        </>
    );
};