import React, { useState } from "react";
import api from "../../utils/Api";
import style from "./style.module.css";
import { useForm } from "react-hook-form";

import Button from "../Button/Button";
import { Rating } from "../Rating/Rating";

export const FormReview = ({ productId }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    const [rating, setRating] = useState(0);

    function handleFormSubmit(data) {
        api.addReview({ ...data, rating }, productId)
            .then((newReview) => console.log(newReview))
    }

    return (
        <form className={style.form} onSubmit={handleSubmit(handleFormSubmit)}>
            <h3>Оставить отзыв</h3>
            <input
                className={style.inputForm}
                type="text"
                {...register("name", {
                    required: "Это поле обязательное"
                })}
                id="name"
                placeholder="Ваше имя"
            />
            <div>
                {errors?.name && <p className={style.errorMessage}>{errors?.name?.message}</p>}
            </div>
            <input
                className={style.inputForm}
                type="text"
                {...register("city")}
                id="city"
                placeholder="Ваш город"

            />
            <textarea
                className={style.inputForm}
                type="text"
                {...register("text", {
                    required: "Это поле обязательное"
                })}
                id="text"
                placeholder="Ваш отзыв"
            />
            <div>
                {errors?.text && <p className={style.errorMessage}>{errors?.text?.message}</p>}
            </div>
            <div className={style.rating}>
                <p>Ваша оценка {rating}</p>
                <Rating
                    isEditable
                    rating={rating}
                    setRating={setRating}
                />
            </div>
            <div className={style.buttonForm}>
                <Button
                    type="secondary"
                >Отправить отзыв
                </Button>
            </div>
        </form>
    );
}
