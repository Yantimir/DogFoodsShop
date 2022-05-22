import React, { useState, useContext } from "react";
import style from "./style.module.css";
import classNames from "classnames";
import { ReactComponent as Save } from "./img/save.svg";
import truck from "./img/truck.svg";
import quality from "./img/quality.svg";

import { AppContext } from "../../context/appContext";

export const Product = () => {

    const [count, setCount] = useState(0);
    const { product, currentUser, handlerProductLike } = useContext(AppContext);
    console.log(product)
    const discount_price = Math.round(product?.price - product?.price * product?.discount / 100);
    const isLiked = product?.likes?.some(id => id === currentUser?._id);

    function createMarkup() {
        return { __html: product?.description };
    }

    function handlerLikeClick() {
        const productId = product?._id;
        handlerProductLike({ productId, isLiked });
    }

    return (

        <>
            <div>
                <a href="" className="button-back">Hазад</a>
                <h1 className={style.productTitle}>{product.name}</h1>
                <div >
                    <span >Артикул: <b>2388907</b></span>
                    <p>{product?.reviews?.length} отзывов</p>
                    {/*тут будут отзывы*/}
                </div>

                <div className={style.product}>
                    <div className={style.imgWrapper}>
                        <img src={product?.pictures} alt={`Изабражение товара ${product?.name}`} />
                    </div>
                    <div className={style.desc}>
                        <span className={!!product?.discount ? style.oldPrice : style.price}>{product?.price}₽</span>
                        {!!product?.discount && <span className={classNames(style.price, style['price_type_discount'])}>{discount_price}₽</span>}
                        <div className={style.btnWrap}>
                            <div className={style.btnLeft}>
                                <button className={style.minus}> - </button>
                                <span className={style.amount}>{count}</span>
                                <button className={style.plus}> + </button>
                            </div>
                            <a href="#" className={classNames("btn", "btn_type_primary", style.buttonCart)}>В корзину</a>
                        </div>
                        <button onClick={handlerLikeClick} className={classNames(style.favorite, { [style.favoriteActive]: isLiked })}>
                            <Save />
                            <span className={style.naming}>{isLiked ? "В избранном" : "В избранное"}</span>
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
                        <div> {product?.discount ? discount_price : product?.price} ₽ за 100 грамм</div>
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
                    <h3 className={style.title}>Отзывы</h3>
                </div>
            </div>
        </>
    );
};
