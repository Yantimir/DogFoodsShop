import React from "react";

export const AppContext = React.createContext({
    cards: [],
    currentUser: {},
    searchQuery: "",
    handlerInputChange: () => {},
    handlerFormSubmit: () => {},
    handlerUpdateUser: () => {},
    handlerProductLike: () => {}
    // favorites: [],
    // handleProductLike: () => {},
});

AppContext.displayName = "AppContext";