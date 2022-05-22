import React, { useContext } from "react";
import classnames from "classnames"; // yarn add classnames
import style from "./style.module.css";

import { AppContext } from "../../context/appContext";
import Button from "../Button/Button";

export const Header = ({ children }) => {

    const { currentUser: user, handlerUpdateUser } = useContext(AppContext);

    function handlerClickUpdateUser(e)  {
        e.preventDefault();
        handlerUpdateUser({name: "Мингазитдинов Янтимир", about: "покупатель"});
    }

    return (
        <header className={style.header}>
            <div className={classnames(style.wrapper, "container")}>
                {children}
                <div className={style.client}>
                    <div className={style.avatar}>
                        {user.avatar && <img className={style.avatar} src={user.avatar} alt={user.avatar} />}
                    </div>
                    <div className={style.profile}>
                        {user.name && <div>{user.name}</div>}
                        {user.about && <div>{user.about}</div>}
                        {user.email && <div>{user.email}</div>}
                        <Button handlerClick={handlerClickUpdateUser} type="secondary">Изменить</Button>
                    </div>
                </div>
            </div>
        </header>
    );
};