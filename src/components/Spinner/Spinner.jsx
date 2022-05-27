import React from "react";
import style from "./style.module.css";
import classnames from "classnames";

const Spinner = () => {
    return (
        <>
            <div className={classnames(style.spinner, style["spinner--gray"]) }></div>
        </>

    )
}

export default Spinner;