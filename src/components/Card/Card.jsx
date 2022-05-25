import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { isLiked } from "../../utils/utils";
import "./style.css";
import classnames from "classnames";
import { ReactComponent as Save } from "./img/save.svg";
import ContentLoader from "react-content-loader";

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

    const { currentUser, handleProductLike, isLoading } = useContext(AppContext);
    const discount_price = Math.round(price - price * discount / 100);
    const isLike = likes && isLiked(likes, currentUser._id);


    function handlerLikeClick() {
        const productId = _id;
        handleProductLike({ productId, isLike });
    }

    return (
        <>
            {
                isLoading
                    ? (<ContentLoader
                        speed={2}
                        width={236}
                        height={408}
                        viewBox="0 0 236 408"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#d1d1d1"
                    >
                        < path d="M 0 0 h 185.6 v 187 H 0 z M 0 203 h 186 v 14 H 0 z M 0 233 h 186 v 56 H 0 z M 0 305 h 186 v 24 H 0 z" />
                        <rect x="0" y="345" rx="20" ry="20" width="121" heigth="40" />
                    </ContentLoader >)
                    : (<div className="card">
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
                                    <Save className={classnames("card__favorite-icon", { "card__favorite-icon_active": isLike })} />
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
                    </div >)
            }
        </>
    );
};
