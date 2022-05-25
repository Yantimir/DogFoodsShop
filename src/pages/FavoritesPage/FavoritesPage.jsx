import React, { useContext } from "react";
import { Cards } from "../../components/Cards/Cards";
import Spinner from "../../components/Spinner/Spinner";
import { AppContext } from "../../context/appContext";

export const FavoritesPage = () => {

    const { isLoading, favoritesCards } = useContext(AppContext);

    return (
        <>
            <div className="content__cards">
                {isLoading && <Spinner />}
                <Cards goods={favoritesCards}/>
            </div>
        </>
    );
}
