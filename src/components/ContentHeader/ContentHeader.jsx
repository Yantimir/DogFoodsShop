import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";

export const ContentHeader = ({ title, children }) => {

    const navigate = useNavigate();

    function handleClickBack() {
        navigate(-1);
    }

    return (
        <div>
            <a onClick={handleClickBack} href="#" className={style.buttonBack}>Hазад</a>
            <h1 className={style.title}>{title}</h1>
            {children}
        </div>
    );
}
