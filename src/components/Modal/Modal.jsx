import React from "react";
import style from "./style.module.css";
import classNames from "classnames";
import { CloseOutlined } from "@ant-design/icons/lib/icons";

export const Modal = ({ active, setActive, children }) => {

    return (
        <div className={classNames(style.modal,
            {
                [style.active]: active
            })} 
            onMouseDown={()=> {
                setActive(false);
            }}>
            <div className={style.content} onMouseDown={(e)=> e.stopPropagation()}>
                <CloseOutlined
                    className={style.crossIcon}
                    onClick={() => setActive(false)}
                />
                {children}
            </div>
        </div>
    );
}
