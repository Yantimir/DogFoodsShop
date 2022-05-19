import React, { useContext } from "react";
import { AppContext } from "../../context/appContext";
import "./style.css";

export const SearchInfo = () => {

    const { cards, searchQuery } = useContext(AppContext);
    const searchCount = cards?.length;

    return (
        searchQuery && <section className="search-title">
            По запросу <span>{searchQuery}</span> найдено {searchCount} товаров
        </section>
    );
};