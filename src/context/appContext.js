import React from "react";

export const AppContext = React.createContext({
    cards: [],
    product: {},
    currentUser: {},
    searchQuery: "",
    isLoading: false,
    handleInputChange: () => {},
    handleFormSubmit: () => {},
    handleUpdateUser: () => {},
    handleProductLike: () => {},
    handleChangeSort: () => {}
    // favorites: [],
});

AppContext.displayName = "AppContext";