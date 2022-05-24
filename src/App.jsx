import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

// API
import api from "./utils/Api";

// context
import { AppContext } from "./context/appContext";

// hooks
import useDebounce from "./hooks/useDebounce";

// components
import { Header } from "./components/Header/Header";
import { Logo } from "./components/Logo/Logo";
import { Search } from "./components/Search/Search";
import { SearchInfo } from "./components/SearchInfo/SearchInfo";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { FaqPage } from "./pages/FaqPage/FaqPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { Footer } from "./components/Footer/Footer";

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
        handleRequest();
    }, [delaySeachQuery]);

    const handleInputChange = (inputValue) => {
        setSearchQuery(inputValue);
    }

    const handleRequest = useCallback(() => {
        setIsLoading(!isLoading);
        api.searchProducts(delaySeachQuery)
            .then(dataSearch => setCards(dataSearch))
            .catch(err => console.log(err))
            .finally(() => {
                setTimeout(() => setIsLoading(isLoading), 500)
            })
    }, [delaySeachQuery])

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleRequest();
    }
    // ----------------------------------------------

    // обновление информации о пользователе
    const handleUpdateUser = (userUpdate) => {
        api.setUserInfo(userUpdate)
            .then(newUserData => setCurrentUser(newUserData))
            .catch(err => console.log(err))
    }

    // установка/снятие лайка
    const handleProductLike = ({ productId, isLiked }) => {
        api.changeLikeStatus(productId, isLiked)
            .then((newCard) => {
                const newCardsState = cards.map(card => {
                    return card._id === newCard?._id ? newCard : card;
                });
                setCards(newCardsState);
            })
    }

    // сортировка карточек товара
    const handleChangeSort = (currentSort) => {
        switch (currentSort) {
            case "minPrice": setCards(cards.sort((a, b) => a.price - b.price));
                break;
            case "maxPrice": setCards(cards.sort((a, b) => b.price - a.price));
                break;
            case "sale": setCards(cards.sort((a, b) => b.discount - a.discount));
                break;
            default: setCards(cards.sort((a, b) => a.price - b.price));
        }
    }

    return (
        <>
            <AppContext.Provider value={
                {
                    cards,
                    currentUser,
                    searchQuery,
                    isLoading,
                    handleInputChange,
                    handleFormSubmit,
                    handleUpdateUser,
                    handleProductLike,
                    handleChangeSort
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
                        <Route path="/faq" element={
                            <FaqPage />
                        } />
                        <Route path="*" element={
                            <NotFoundPage />
                        } />
                    </Routes>
                </div>
                <Footer />
            </AppContext.Provider>
        </>
    );
};
