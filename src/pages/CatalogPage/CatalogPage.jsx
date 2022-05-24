import React, { useContext } from "react";
import { AppContext } from "../../context/appContext";
import { Sort } from "../../components/Sort/Sort";
import Spinner from "../../components/Spinner/Spinner";
import { Cards } from "../../components/Cards/Cards";

const tabs = [
    {
        id: "minPrice",
        title: "Сначала дешевые"
    },
    {
        id: "maxPrice",
        title: "Сначала дорогие"
    },
    {
        id: "sale",
        title: "По скидке"
    },
];

export const CatalogPage = () => {

    const { isLoading, handleChangeSort } = useContext(AppContext);

    const handleClickSort = (data) => {
        handleChangeSort(data)
    }

    return (
        <>
            <Sort
                tabs={tabs}
                onChangeSort={handleClickSort}
            />
            <div className="content__cards">
                {isLoading && <Spinner />}
                <Cards />
            </div>
        </>
    );
};
