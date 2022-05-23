import React from "react";
import style from "./style.module.css";
import notFound from './img/ic-notfound.svg';
import Button from "../Button/Button";

export const NotFound = ({ children, title, buttonText, buttonAction }) => {

    return (
        <div className={style.notFound}>
            <img
                src={notFound}
                className={style.image}
                alt=""
                aria-hidden="true"
            />
            <h2 className={style.title}>{title}</h2>
            {children}
            {/* <button className="btn" onClick={buttonAction}>{buttonText}</button> */}
            <Button buttonAction={buttonAction} type="primary">{buttonText}</Button>
        </div>
    );
}