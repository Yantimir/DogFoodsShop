import React, { useContext } from "react";
import style from "./style.module.css";
import { AppContext } from "../../context/appContext";

import { Card } from "../Card/Card";

export const Cards = () => {

    const { cards } = useContext(AppContext);

    return (
        <div className={style.cards}>
            {cards?.map(({ __v, ...dataItem }) => {
                return (<Card key={`${dataItem._id}`} {...dataItem} />)
            })}
        </div>
    );
};