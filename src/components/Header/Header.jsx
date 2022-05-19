import React from "react";
import classnames from "classnames"; // yarn add classnames
import style from "./style.module.css";

export const Header = ({ children }) => {

    return (
        <header className={style.header}>
            <div className={classnames(style.wrapper, "container")}>
                {children}
            </div>
        </header>
    );
};