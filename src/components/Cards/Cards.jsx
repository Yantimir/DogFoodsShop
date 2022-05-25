import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";

import { Card } from "../Card/Card";
import { NotFound } from "../NotFound/NotFound";

export const Cards = ({ goods }) => {

    const navigate = useNavigate();

    return (
        <>
            {!goods.length
                ? <NotFound
                    title={"Нет избранных товаров"}
                    buttonText={"На главную"}
                    buttonAction={() => navigate("/")}
                >
                </NotFound>
                : <div className={style.cards}>
                    {goods?.map(({ __v, ...dataItem }) => {
                        return (<Card key={`${dataItem._id}`} {...dataItem} />)
                    })}
                </div>
            }
        </>
    );
};