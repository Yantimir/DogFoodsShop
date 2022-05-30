import React, { useContext } from "react";
import style from "./style.module.css";
import { AppContext } from "../../context/appContext";

export const AuthorReview = ({ review }) => {

    const { users } = useContext(AppContext);

    return (
        <>
            {users?.map((user) => (
                <div key={user._id}>
                    {user._id === review.author
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

        </>
    );
}
