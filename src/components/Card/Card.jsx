import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import classnames from "classnames";
import { ReactComponent as Save } from "./img/save.svg";

import { AppContext } from "../../context/appContext";

export const Card = (
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
        const productId = _id;
        handlerProductLike({ productId, isLiked });
    }

    return (

        <div className="card">
            <div className="card__sticky card__sticky_type_top-left">
                {!!discount && <span className="card__discount">
                    {`-${discount}%`}
                </span>}
                {tags && tags.map((tag, i) =>
                    <span key={i} className={classnames('tag', { [`tag_type_${tag}`]: true })}>{tag}</span>
                )}
            </div>
            <div className="card__sticky card__sticky_type_top-right">
                <div className="card__like">
                    <button onClick={handlerLikeClick} className="card__favorite">
                        <Save className={classnames( "card__favorite-icon", { "card__favorite-icon_active": isLiked })} />
                    </button>
                    {!!likes?.length && <div className="number-of-likes">{likes?.length}</div>}
                </div>
            </div>


            <Link to={`/product/${_id}`} className="card__link">
                <img src={pictures} alt={description} className="card__image" />
                <div className="card__desc">
                    {!!discount && <span className="card__old-price">{price}₽</span>}
                    <span className={classnames("card__price", { "card__price_type_discount": !!discount })}>{discount_price}₽</span>
                    <span className="card__wight">{wight}</span>
                    <span className="card__wight">в наличии: {stock} шт</span>
                    <p className="card__name">{name}</p>
                </div>
            </Link>
            <a href="#" className="card__cart btn btn_type_primary">
                В корзину
            </a>
        </div >

    );
};
