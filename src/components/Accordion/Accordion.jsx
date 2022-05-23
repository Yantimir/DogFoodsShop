import React, { useState } from "react";
import style from "./style.module.css";
import classNames from 'classnames';

export const Accordion = ({ title, children }) => {

    const [selected, setSelected] = useState(false);

    function toggleAction() {
        setSelected(!selected);
    }

    return (
        <>
            <div className={classNames(style.accordion, { [style.active]: selected })}>
                <button className={style.accordionButton} onClick={toggleAction}>
                    <p className={style.title}>{title}</p>
                </button>
                <div className={style.content}>
                    <div className={style.text}>{children}</div>
                </div>
            </div>
        </>
    );
}
