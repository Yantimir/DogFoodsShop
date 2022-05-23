import React, { useContext } from "react";
import { AppContext } from "../../context/appContext";
import { Sort } from "../../components/Sort/Sort";
import Spinner from "../../components/Spinner/Spinner";
import { Cards } from "../../components/Cards/Cards";

export const CatalogPage = () => {

    const { isLoading } = useContext(AppContext);
    
    return (
        <>
            <Sort />
            <div className="content__cards">
                {isLoading && <Spinner />}
                <Cards />
            </div>
        </>
    );
};
