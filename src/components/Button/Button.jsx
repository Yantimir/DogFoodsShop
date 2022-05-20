import React from "react";
import classNames from "classnames";

import style from "./style.module.css";



const _Button = ({ type, children }) => {
    return (
        <button className={classNames(
            style.button,
            {
                [style.primary]: type === "primary",
                [style.secondary]: type === "secondary"
            }
        )}>
            {children}
        </button>
    );
}

export default _Button;