import React from "react";

export const AppContext = React.createContext({
    cards: [],
    setCards: () => {},
    favoritesCards: [],
    // product: {},
    users: [],
    currentUser: {},
    searchQuery: "",
    isLoading: false,
    handleInputChange: () => {},
    handleFormSubmit: () => {},
    handleUpdateUser: () => {},
    handleProductLike: () => {},
    clearSearch: () => {},
    handleChangeSort: () => {}
});

AppContext.displayName = "AppContext";