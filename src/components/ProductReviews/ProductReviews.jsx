import React, { useContext } from "react";
import style from "./style.module.css";
import { AppContext } from "../../context/appContext";

import { Rating } from "../Rating/Rating";

{/* <div className={style.avatar}>
    {user.avatar && <img className={style.avatar} src={user.avatar} alt={user.avatar} />}
</div> */}

export const ProductReviews = ({ reviews }) => {

    const { users } = useContext(AppContext);
    console.log(users)

    return (
        <div>
            {reviews?.map((rev) => (
                <div key={rev._id} className={style.reviews}>
                    {/* <div className={style.author}>{rev.author}</div> */}
                    {users?.map((user) => (
                        <div>
                            {user._id === rev.author
                                && <div className={style.author}>
                                    <img className={style.avatar} src={user.avatar} alt={user.avatar} />
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
