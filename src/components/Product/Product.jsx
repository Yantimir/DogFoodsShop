import React, { useState, useContext } from "react";
import style from "./style.module.css";
import classNames from "classnames";
import { isLiked } from "../../utils/utils";
import { AppContext } from "../../context/appContext";
import { Link } from 'react-scroll';

import { ReactComponent as Save } from "./img/save.svg";
import truck from "./img/truck.svg";
import quality from "./img/quality.svg";

import { ContentHeader } from "../ContentHeader/ContentHeader";
import { Rating } from "../Rating/Rating";
import { ProductReviews } from "../ProductReviews/ProductReviews";
import { FormReview } from "../FormReview/FormReview";

export const Product = ({
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
    reviews,
    addReviews
}) => {

    const [count, setCount] = useState(0);
    const { currentUser, handleProductLike } = useContext(AppContext);
    const wordDeclensionResult = wordDeclension(reviews?.length, ["отзыв", "отзыва", "отзывов"]);
    const discount_price = Math.round(price - price * discount / 100);
    const isLike = likes && isLiked(likes, currentUser?._id);
    const ratingSumm = Math.round(reviews?.map(review => review.rating).reduce((acc, item) => {
        return acc += item;
    }, 0) / reviews?.length);


    function createMarkup() {
        return { __html: description };
    }

    function handleLikeClick() {
        const productId = _id;
        handleProductLike({ productId, isLike });
    }

    function wordDeclension(value, words) {
        value = Math.abs(value) % 100;
        let num = value % 10;
        if (value > 10 && value < 20) return words[2];
        if (num > 1 && num < 5) return words[1];
        if (num == 1) return words[0];
        return words[2];
    }

    return (
        <>
            <ContentHeader title={name}>
                <div className={style.productInfo}>
                    <span >Артикул: <b>2388907</b></span>
                    <Rating rating={ratingSumm} />
                    <Link
                        className={style.linkReviews}
                        to="reviews"
                        smooth={true}
                        duration={400}
                    >
                        {`${reviews?.length} ${wordDeclensionResult}`}
                    </Link>
                </div>
            </ContentHeader>

            <div className={style.product}>
                <div className={style.imgWrapper}>
                    <img src={pictures} alt={`Изабражение товара ${name}`} />
                </div>
                <div className={style.desc}>
                    <span className={!!discount ? style.oldPrice : style.price}>{price}₽</span>
                    {!!discount && <span className={classNames(style.price, style['price_type_discount'])}>{discount_price}₽</span>}
                    <div className={style.btnWrap}>
                        <div className={style.btnLeft}>
                            <button className={style.minus}> - </button>
                            <span className={style.amount}>{count}</span>
                            <button className={style.plus}> + </button>
                        </div>
                        <a href="#" className={classNames("btn", "btn_type_primary", style.buttonCart)}>В корзину</a>
                    </div>
                    <button onClick={handleLikeClick} className={classNames(style.favorite, { [style.favoriteActive]: isLike })}>
                        <Save />
                        <span className={style.naming}>{isLike ? "В избранном" : "В избранное"}</span>
                    </button>
                    <div className={style.delivery}>
                        <img src={truck} aria-hidden="true" />
                        <div className={style.right}>
                            <h3 className={style.name}>Доставка по всему Миру!</h3>
                            <p className={style.text}>Доставка курьером - <span className={style.bold}>от 399 ₽</span></p>
                            <p className={style.text}>Доставка в пункт выдачи - <span className={style.bold}>от 199 ₽</span></p>
                        </div>
                    </div>
                    <div className={style.delivery}>
                        <img src={quality} aria-hidden="true" />
                        <div className={style.right}>
                            <h3 className={style.name}>Гарантия качества</h3>
                            <p className={style.text}>Если вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все возможное, чтобы удовлетворить ваши нужды</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.box}>
                <h3 className={style.title}>Описание</h3>
                <p dangerouslySetInnerHTML={createMarkup()}></p>
                <h3 className={style.title}>Характеристики</h3>
                <div className={style.grid}>
                    <div className={style.naming}>Вес</div>
                    <div>1 шт. 120-200 грамм</div>
                    <div className={style.naming}>Цена</div>
                    <div> {discount ? discount_price : price} ₽ за 100 грамм</div>
                    <div className={style.naming}>Польза</div>
                    <div className={style.description}>
                        <p>
                            Большое содержание аминокислот и микроэлементов оказывает
                            положительное воздействие на общий обмен веществ собаки.
                        </p>
                        <p>Способствуют укреплению десен и жевательных мышц.</p>
                        <p>
                            Развивают зубочелюстной аппарат, отвлекают собаку во время смены
                            зубов.
                        </p>
                        <p>
                            Имеет цельную волокнистую структуру, при разжевывание получается
                            эффект зубной щетки, лучше всего очищает клыки собак.
                        </p>
                        <p>Следует учесть высокую калорийность продукта.</p>
                    </div>
                </div>
                <h3 id="reviews" className={style.title}>Отзывы</h3>
                <ProductReviews reviews={reviews} />
            </div>
            <FormReview productId={_id} addReviews={addReviews} />
        </>
    );
};
