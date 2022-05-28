import React, { useContext } from "react";
import style from "./style.module.css";
import { AppContext } from "../../context/appContext";

import { Rating } from "../Rating/Rating";

export const ProductReviews = ({ reviews }) => {

    const { users } = useContext(AppContext);

    console.log(reviews)
    return (
        <div>
            {reviews?.map((rev) => (
                <div key={rev._id} className={style.reviews}>
                    {users?.map((user) => (
                        <div key={user._id}>
                            {user._id === rev.author
                                && <div className={style.author}>
                                    <img className={style.avatar} src={user.avatar} alt={user.avatar} />
                                    <div className={style.user}>
                                        <div className={style.userName}>{user.name}</div>
                                        <div className={style.about}>{user.about}</div>
                                    </div>

                                </div>
                            }
                        </div>
                    ))}
                    <div className={style.text}>
                        <Rating />
                        <p>
                            {rev.text}
                        </p>

                    </div>
                </div>
            ))
            }
        </div >
    );
}
