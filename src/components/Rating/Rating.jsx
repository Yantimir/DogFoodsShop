import React, { useState, useEffect } from "react";
import style from "./style.module.css";
import classNames from "classnames";
import { ReactComponent as StarIcon } from "./img/star.svg";

export const Rating = ({ isEditable = false, rating, setRating }) => {

    const [ratingArray, setRatingArray] = useState(new Array(5).fill(<></>));

    useEffect(() => {
        constructRating(rating);
    }, [rating]);

    function constructRating(currentRating) {
        const updateArray = ratingArray.map((r, index) => {
            return (
                <StarIcon
                    className={classNames({
                        [style.filled]: index < currentRating,
                        [style.editable]: isEditable
                    })
                    }
                    onMouseEnter={() => chageDisplay(index + 1)}
                    onMouseLeave={() => chageDisplay(rating)}
                    onClick={() => onClick(index + 1)}
                />
            );
        });

        setRatingArray(updateArray);
    }

    function chageDisplay(r) {
        if (!isEditable) {
            return;
        }
        constructRating(r);
    }

    function onClick(r) {
        if (!isEditable || !setRating) {
            return;
        }
        setRating(r)
    }

    return (
        <div>
            {ratingArray.map((r, i) => (<span key={i}>{r}</span>))}
        </div>
    )
}
