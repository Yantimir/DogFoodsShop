import React, { useContext } from "react";
import style from "./style.module.css";
import { AppContext } from "../../context/appContext";

import { Rating } from "../Rating/Rating";

export const ProductReviews = ({ reviews }) => {

    const { users } = useContext(AppContext);

    return (
        <div>
            {reviews?.map((review) => (
                <div key={review?._id} className={style.reviews}>
                    {users?.map((user) => (
                        <div key={user._id}>
                            {user._id === review?.author
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
                        <Rating rating={review?.rating}/>
                        <p>
                            {review?.text}
                        </p>
                    </div>
                </div>
            ))
            }
        </div >
    );
}
