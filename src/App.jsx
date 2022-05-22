import React, { useState, useEffect, useCallback } from "react";
import api from "./utils/Api";
import { AppContext } from "./context/appContext";

import useDebounce from "./hooks/useDebounce";

import { Header } from "./components/Header/Header";
import { Logo } from "./components/Logo/Logo";
import { Search } from "./components/Search/Search";
import { SearchInfo } from "./components/SearchInfo/SearchInfo";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
// import { Sort } from "./components/Sort/Sort";
// import Spinner from "./components/Spinner/Spinner";
// import { Cards } from "./components/Cards/Cards";
import { Footer } from "./components/Footer/Footer";

const ID_PRODUCT = "622c77e877d63f6e70967d22";

export const App = () => {

    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const delaySeachQuery = useDebounce(searchQuery, 300);

    useEffect(() => {
        Promise.all(
            [
                api.getProductsList(),
                api.getUserInfo(),
                api.getProductById(ID_PRODUCT)
            ]
        )
            .then(([productData, userData]) => {
                setCards(productData?.products);
                setCurrentUser(userData);
                setProduct(productData?.products);
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
    const handlerProductLike = ({ _id, isLiked }) => {
        api.changeLikeStatus(_id, isLiked)
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
                    product,
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
                    <CatalogPage />
                    <ProductPage />
                    {/* <Sort />
                    <div className="content__cards">
                        {isLoading && <Spinner />}
                        <Cards />
                    </div> */}
                </div>
                <Footer />
            </AppContext.Provider>
        </>
    );
};
