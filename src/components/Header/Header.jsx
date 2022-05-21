import React, { useContext } from "react";
import classnames from "classnames"; // yarn add classnames
import style from "./style.module.css";

import { AppContext } from "../../context/appContext";
import Button from "../Button/Button";

export const Header = ({ children }) => {

    const { currentUser: client, onUpdateUser } = useContext(AppContext);

    function handlerClickEditClient(e)  {
        e.preventDefault();
        onUpdateUser({name: "Мингазитдинов Янтимир", about: "пользователь"});
    }
    return (
        <header className={style.header}>
            <div className={classnames(style.wrapper, "container")}>
                {children}
                <div className={style.client}>
                    <div className={style.avatar}>
                        {client.avatar && <img className={style.avatar} src={client.avatar} alt={client.avatar} />}
                    </div>
                    <div className={style.profile}>
                        {client.name && <div>{client.name}</div>}
                        {client.about && <div>{client.about}</div>}
                        {client.email && <div>{client.email}</div>}
                        <Button handlerClick={handlerClickEditClient} type="secondary">изменить</Button>
                    </div>
                </div>
            </div>
        </header>
    );
};