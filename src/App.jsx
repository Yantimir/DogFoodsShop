import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";

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
import { FavoritesPage } from "./pages/FavoritesPage/FavoritesPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { FaqPage } from "./pages/FaqPage/FaqPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { Footer } from "./components/Footer/Footer";
import { Modal } from "./components/Modal/Modal";
import {RegistrationForm} from "./components/RegistrationForm/RegistrationForm";
import { AuthForm } from "./components/AuthForm/AuthForm";


export const App = () => {

    const [cards, setCards] = useState([]);
    const [favoritesCards, setFavoritesCards] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const delaySeachQuery = useDebounce(searchQuery, 300);
    const [contacts, setContacts] = useState([]);
    const [modalActiveAuth, setModalActiveAuth] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    const addContacts = (contactInfo) => {
        setContacts([...contacts, contactInfo]);
    }



    useEffect(() => {
        Promise.all([api.getProductsList(), api.getUserInfo(), api.getAllUsers()])
            .then(([productsData, userData, usersData]) => {
                setCards(productsData?.products);
                setCurrentUser(userData);
                setUsers(usersData);

                const filteredData = productsData?.products?.filter(product =>
                    product?.likes?.some(id =>
                        id === userData._id
                    )
                );
                setFavoritesCards(filteredData);
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

    const handleFormSubmit = (inputValue) => {
        setSearchQuery(inputValue);
        navigate("/");
        handleRequest();
    }
    // очистка input поиска
    const clearSearch = () => {
        setSearchQuery("");
    }
    // сортировка карточек товара
    const handleChangeSort = (currentSort) => {
        switch (currentSort) {
            case "minPrice": setCards([...cards].sort((a, b) => a.price - b.price));
                break;
            case "maxPrice": setCards([...cards].sort((a, b) => b.price - a.price));
                break;
            case "sale": setCards([...cards].sort((a, b) => b.discount - a.discount));
                break;
            default: setCards([...cards].sort((a, b) => a.price - b.price));
        }
    }
    // ----------------------------------------------

    // обновление информации о пользователе
    const handleUpdateUser = (userUpdate) => {
        api.setUserInfo(userUpdate)
            .then(newUserData => setCurrentUser(newUserData))
            .catch(err => console.log(err))
    }

    // установка/снятие лайка
    const handleProductLike = ({ productId, isLike }) => {
        api.changeLikeStatus(productId, isLike).then((newCard) => {
            const newCardsState = cards.map(card => {
                return card._id === newCard?._id ? newCard : card;
            });

            if (!isLike) {
                setFavoritesCards(prevState => [...prevState, newCard]);
            } else {
                setFavoritesCards(prevState => {
                    return prevState.filter(card => card._id !== newCard._id)
                });
            }
            setCards(newCardsState);
        })
    }

    return (
        <>
            <AppContext.Provider value={{
                cards,
                setCards,
                favoritesCards,
                users,
                currentUser,
                searchQuery,
                isLoading,
                handleInputChange,
                handleFormSubmit,
                handleUpdateUser,
                handleProductLike,
                clearSearch,
                handleChangeSort
            }}>
                <Header>
                    <Logo />
                    <Search searchText={searchQuery} />
                    <Link to="/login" state={{ backgroundLocation: location, initialPath: location.pathname }}>Login</Link>
                </Header>
                <main className="content container">
                    {/* <button onClick={() => setModalActive(true)}>Open modal</button>
                    <Modal
                        active={modalActive}
                        setActive={setModalActive}
                    >
                        <RegistrationForm />
                    </Modal> */}
                    <SearchInfo />
                    <Routes location={state && { ...state?.backgroundLocation, pathname: state?.initialPath } || location}>
                        <Route path="/" element={
                            <CatalogPage />
                        } />
                        <Route path="/favorites" element={
                            <FavoritesPage />
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

                    {state?.backgroundLocation && (
                        <Routes>
                            <Route path="/login" element={
                                <Modal active={true} setActive={() => { navigate(-1) }}>
                                    <>
                                        <AuthForm />
                                        <div>
                                            <Link to="/register" replace={true} state={{ ...state, backgroundLocation: location }}>Зарегестрироваться</Link>
                                        </div>
                                        <div>
                                            <Link to="/forgot" replace={true} state={{ ...state, backgroundLocation: location }}>Восстановить пароль</Link>
                                        </div>
                                    </>
                                </Modal>
                            } />
                            <Route path="/register" element={
                                <Modal active={true} setActive={() => { navigate(-1) }}>
                                    <>
                                        <RegistrationForm />
                                        <div>
                                            <Link to="/login" replace={true} state={{ ...state, backgroundLocation: location }}>Войти</Link>
                                        </div>
                                    </>
                                </Modal>
                            } />
                            <Route path="/forgot" element={
                                <Modal active={true} setActive={() => { navigate(-1) }}>
                                    <>
                                        Восстановление пароля
                                    </>
                                </Modal>
                            } />
                        </Routes>
                    )}
                </main>
                <Footer />
            </AppContext.Provider>
        </>
    );
};
