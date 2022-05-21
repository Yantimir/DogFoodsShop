import React, { useState, useEffect, useCallback } from "react";
import api from "./utils/Api";
import { AppContext } from "./context/appContext";

import useDebounce from "./hooks/useDebounce";

import { Header } from "./components/Header/Header";
import { Logo } from "./components/Logo/Logo";
import { Search } from "./components/Search/Search";
import Spinner from "./components/Spinner/Spinner";
import { Footer } from "./components/Footer/Footer";
import { Product } from "./components/Product/Product";

const ID_PRODUCT = "622c77e877d63f6e70967d22";
export const PageProduct = () => {

    const [product, setProduct] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    // const delaySeachQuery = useDebounce(searchQuery, 300);

    useEffect(() => {
        Promise.all([api.getProductById(ID_PRODUCT), api.getUserInfo()])
            .then(([productData, userData]) => {
                setProduct(productData);
                setCurrentUser(userData);
            })
            .catch(err => console.log(err))
    }, []);

    // поиск ---------------------------------------
    useEffect(() => {
        handlerRequest();
    }, [searchQuery]);

    const handlerInputChange = (inputValue) => {
        setSearchQuery(inputValue);
    }

    const handlerRequest = useCallback(() => {
        setIsLoading(!isLoading);
        api.searchProducts(searchQuery)
            .then(dataSearch => console.log(dataSearch))
            .catch(err => console.log(err))
            .finally(() => {
                setTimeout(() => setIsLoading(isLoading), 1000)
            })
    }, [searchQuery])

    const handlerFormSubmit = (inputValue) => {
        setSearchQuery(inputValue);
        handlerRequest();
    }
    // ----------------------------------------------

    // // обновление информации о пользователе
    // const handlerUpdateUser = (userUpdate) => {
    //     api.setUserInfo(userUpdate)
    //         .then(newUserData => setCurrentUser(newUserData))
    //         .catch(err => console.log(err))
    // }

    // установка/снятие лайка
    const handlerProductLike = ({ productId, isLiked }) => {
        api.changeLikeStatus(productId, isLiked)
            .then((newCard) => {
                setProduct(newCard);
            })
    }

    return (
        <>
            <AppContext.Provider value={
                {
                    product,
                    currentUser,
                    // searchQuery,
                    // handlerInputChange,
                    handlerFormSubmit,
                    // handlerUpdateUser,
                    handlerProductLike
                }
            }>
                <Header>
                    <Logo />
                    <Search />
                </Header>
                <div className="content container">
                    {isLoading && <Spinner />}
                    <Product />
                </div>
                <Footer />
            </AppContext.Provider>
        </>
    );
};
