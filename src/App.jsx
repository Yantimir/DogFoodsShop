import React, { useState, useEffect } from "react";
import api from "./utils/Api";
import { AppContext } from "./context/appContext";

import { Header } from "./components/Header/Header";
import { Logo } from "./components/Logo/Logo";
import { Search } from "./components/Search/Search";
import { SearchInfo } from "./components/SearchInfo/SearchInfo";
import { Sort } from "./components/Sort/Sort";
import { Cards } from "./components/Cards/Cards";
import { Footer } from "./components/Footer/Footer";

export const App = () => {

    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    // console.log(currentUser)
    useEffect(() => {
        Promise.all([api.getProductsList(), api.getUserInfo()]).then(
            ([productData, userData]) => {
                setCards(productData?.products);
                setCurrentUser(userData);
            })
    }, []);

    useEffect(()=>{
        handlerRequest();
    }, [searchQuery]);

    const handlerInputChange = (inputValue) => {
        setSearchQuery(inputValue);
    }

    const handlerRequest = () => {
        if (searchQuery !== "") {
            const filterCards = cards.filter(card => card?.name.toLowerCase().includes(searchQuery.toLowerCase()));
            setCards(prevState => filterCards);
        }
    }

    const handlerFormSubmit = (e) => {
        e.preventDefault();
        handlerRequest();
    }

    return (
        <>
            <AppContext.Provider value={
                {
                    cards,
                    currentUser,
                    searchQuery,
                    handlerInputChange,
                    handlerFormSubmit
                }
            }>
                <Header>
                    <Logo />
                    <Search />
                </Header>
                <div className="content container">
                    <SearchInfo />
                    <Sort />
                    <div className="content__cards">
                        <Cards />
                    </div>
                </div>
                <Footer />
            </AppContext.Provider>
        </>
    );
};
