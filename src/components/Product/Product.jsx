import React, { useContext } from "react";
import style from "./style.module.css";
// import classNames from "classnames";
import { ReactComponent as Save } from "./img/save.svg";

import { AppContext } from "../../context/appContext";

export const Product = (
    {
        _id,
        name,
        likes,
        price,
        discount,
        wight,
        description,
        available,
        pictures,
        tags,
        stock,
        reviews
    }) => {
        
    const { currentUser, handlerProductLike } = useContext(AppContext);
    const discount_price = Math.round(price - price * discount / 100);
    const isLiked = likes?.some(id => id === currentUser?._id);

    function handlerLikeClick() {
        handlerProductLike({ _id, isLiked });
    }

    return (


        // <button onClick={handlerLikeClick} className="card__favorite">
        //     <Save className={classnames( "card__favorite-icon", { "card__favorite-icon_active": isLiked })} />
        // </button>

        // {!!discount && <span className="card__old-price">{price}₽</span>}
        // <span className={classnames("card__price", { "card__price_type_discount": !!discount })}>{discount_price}₽</span>

        <>  
            <div>
                <a href="" className="button-back">Hазад</a>
                <h1 className={style.productTitle}>{name}</h1>
                <div className="">
                    <span className="">Артикул: <b>2388907</b></span>
                </div>
            </div>
        </>
    );
};
