import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import api from "./utils/Api";
import { AppContext } from "./context/appContext";

import useDebounce from "./hooks/useDebounce";

import { Header } from "./components/Header/Header";
import { Logo } from "./components/Logo/Logo";
import { Search } from "./components/Search/Search";
import { SearchInfo } from "./components/SearchInfo/SearchInfo";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { Footer } from "./components/Footer/Footer";


// const ID_PRODUCT = "622c77e877d63f6e70967d22";

export const App = () => {

    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const delaySeachQuery = useDebounce(searchQuery, 300);

    useEffect(() => {
        Promise.all(
            [
                api.getProductsList(),
                api.getUserInfo(),
            ]
        )
            .then(([productsData, userData]) => {
                setCards(productsData?.products);
                setCurrentUser(userData);
            })
            .catch(err => console.log(err))
    }, []);

    // поиск ---------------------------------------
    useEffect(() => {
        handlerRequest();
    }, [delaySeachQuery]);

    const handlerInputChange = (inputValue) => {
        setSearchQuery(inputValue);
    }

    const handlerRequest = useCallback(() => {
        setIsLoading(!isLoading);
        api.searchProducts(delaySeachQuery)
            .then(dataSearch => setCards(dataSearch))
            .catch(err => console.log(err))
            .finally(() => {
                setTimeout(() => setIsLoading(isLoading), 500)
            })
    }, [delaySeachQuery])

    const handlerFormSubmit = (e) => {
        e.preventDefault();
        handlerRequest();
    }
    // ----------------------------------------------

    // обновление информации о пользователе
    const handlerUpdateUser = (userUpdate) => {
        api.setUserInfo(userUpdate)
            .then(newUserData => setCurrentUser(newUserData))
            .catch(err => console.log(err))
    }

    // установка/снятие лайка
    const handlerProductLike = ({ productId, isLiked }) => {
        api.changeLikeStatus(productId, isLiked)
            .then((newCard) => {
                const newCardsState = cards.map(card => {
                    return card._id === newCard?._id ? newCard : card;
                });
                setCards(newCardsState);
            })
    }

    return (
        <>
            <AppContext.Provider value={
                {
                    cards,
                    currentUser,
                    searchQuery,
                    isLoading,
                    handlerInputChange,
                    handlerFormSubmit,
                    handlerUpdateUser,
                    handlerProductLike
                }
            }>
                <Header>
                    <Logo />
                    <Search />
                </Header>
                <div className="content container">
                    <SearchInfo />
                    <Routes>
                        <Route path="/" element={
                            <CatalogPage />
                        } />
                        <Route path="/product/:productID" element={
                            <ProductPage />
                        } />
                        <Route path="*" element={
                            <h1>страница не найдена</h1>
                        } />
                    </Routes>
                </div>
                <Footer />
            </AppContext.Provider>
        </>
    );
};
