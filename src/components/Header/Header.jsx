import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames"; // yarn add classnames
import style from "./style.module.css";
import { ReactComponent as FavoriteIcon } from "./img/ic-favorites.svg";

import { AppContext } from "../../context/appContext";
import Button from "../Button/Button";


export const Header = ({ children }) => {

    const { currentUser: user, handleUpdateUser, favoritesCards } = useContext(AppContext);

    function handleClickUpdateUser(e) {
        e.preventDefault();
        handleUpdateUser({ name: "Мингазитдинов Янтимир", about: "покупатель" });
    }

    return (
        <header className={style.header}>
            <div className={classnames(style.wrapper, "container")}>
                {children}

                <div className={style.client}>
                    <div className={style.iconsMenu}>
                        <Link className={style.iconLink} to="/favorites">
                            <FavoriteIcon />
                            <span className={style.iconBubble}>{favoritesCards?.length}</span>
                        </Link>
                    </div>
                    <div className={style.avatar}>
                        {user.avatar && <img className={style.avatar} src={user.avatar} alt={user.avatar} />}
                    </div>
                    <div className={style.profile}>
                        {user.name && <div>{user.name}</div>}
                        {user.about && <div>{user.about}</div>}
                        {user.email && <div>{user.email}</div>}
                        <Button buttonAction={handleClickUpdateUser} type="secondary">Изменить</Button>
                    </div>
                </div>
            </div>
        </header>
    );
};