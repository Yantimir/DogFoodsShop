import React, { useContext } from "react";
import { AppContext } from "../../context/appContext";

import { Cards } from "../../components/Cards/Cards";
import { ContentHeader } from "../../components/ContentHeader/ContentHeader";
import Spinner from "../../components/Spinner/Spinner";


export const FavoritesPage = () => {

    const { isLoading, favoritesCards } = useContext(AppContext);

    return (
        <>
            <ContentHeader title="Избранное"/>
            <div className="content__cards">
                {isLoading && <Spinner />}
                <Cards goods={favoritesCards} />
            </div>
        </>
    );
}
