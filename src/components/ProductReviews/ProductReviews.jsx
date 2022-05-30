import React from "react";
import style from "./style.module.css";

import dayjs from "dayjs"; // yarn add dayjs
import "dayjs/locale/ru"
dayjs.locale("ru");

import { Rating } from "../Rating/Rating";
import { AuthorReview } from "../AuthorReview/AuthorReview";

export const ProductReviews = ({ reviews }) => {

    return (
        <>
            {reviews?.map((review) => (
                <div key={review?._id} className={style.reviews}>
                    <div className={style.authorReview}>
                        <AuthorReview review={review} />
                    </div>
                    <div className={style.text}>
                        <Rating rating={review?.rating} />
                        <p>
                            {review?.text}
                        </p>
                        <div className={style.about}>
                            {dayjs(review?.created_at).format("DD MMMM YYYY HH:mm")}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
