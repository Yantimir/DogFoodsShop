import React from "react";

export const AppContext = React.createContext({
    cards: [],
    product: [],
    currentUser: {},
    searchQuery: "",
    isLoading: false,
    handlerInputChange: () => {},
    handlerFormSubmit: () => {},
    handlerUpdateUser: () => {},
    handlerProductLike: () => {}
    // favorites: [],
});

AppContext.displayName = "AppContext";