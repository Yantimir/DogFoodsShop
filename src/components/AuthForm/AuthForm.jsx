import React from "react";
import style from "./style.module.css";
import { useForm } from "react-hook-form";

import Button from "../Button/Button";


export const AuthForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    function handleFormSubmit(data) {
        console.log(data)
    }

    return (
        <form className={style.form} onSubmit={handleSubmit(handleFormSubmit)}>
            <h3>Авторизация</h3>
            {/* <input
                className={style.inputForm}
                type="text"
                {...register("name", {
                    required: "Это поле обязательное"
                })}
                placeholder="Введите имя"

            />
            <div>
                {errors?.name && <p className={style.errorMessage}>{errors?.name?.message}</p>}
            </div> */}
            <input
                className={style.inputForm}
                type="text"
                {...register("email")}
                placeholder="Введите email"

            />
            <input
                className={style.inputForm}
                type="text"
                {...register("password", {
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message: "Пароль должен содержать 8 символов, одну букву латинского алфавита и одну цифру"
                    }
                })}
                placeholder="Введите пароль"
            />
            <div>
                {errors?.password && <p className={style.errorMessage}>{errors?.password?.message}</p>}
            </div>
            <div className={style.buttonForm}>
                <Button
                    type="secondary"
                >Войти
                </Button>
            </div>
        </form>
    );
}
