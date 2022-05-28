import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

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

// import { SimpleForm } from "./components/SimpleForm/SimpleForm";
// import { ContactList } from "./components/ContactList/ContactList";
import { RegistrationForm } from "./components/RegistrationForm/RegistrationForm";
import { Modal } from "./components/Modal/Modal";


export const App = () => {

    const [cards, setCards] = useState([]);
    const [favoritesCards, setFavoritesCards] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const delaySeachQuery = useDebounce(searchQuery, 300);
    const [contacts, setContacts] = useState([]);
    const [modalActive, setModalActive] = useState(false);

    const addContacts = (contactInfo) => {
        setContacts([...contacts, contactInfo]);
    }

    const navigate = useNavigate();

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
                </Header>
                <div className="content container">
                    <SearchInfo />
                    {/* <SimpleForm addContacts={addContacts}/> */}
                    {/* <ContactList contacts={contacts}/> */}
                    {/* <button onClick={() => setModalActive(true)}>Open modal</button> */}

                    {/* <RegistrationForm /> */}
                    {/* <Modal
                        active={modalActive}
                        setActive={setModalActive}
                    >
                        <RegistrationForm />
                    </Modal> */}
                    <Routes>
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
                </div>
                <Footer />
            </AppContext.Provider>
        </>
    );
};
