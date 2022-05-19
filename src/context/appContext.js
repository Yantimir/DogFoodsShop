import React from "react";

export const AppContext = React.createContext({
    cards: [],
    currentUser: {},
    searchQuery: "",
    handlerInputChange: () => {},
    handlerFormSubmit: () => {},
    // favorites: [],
    // handleProductLike: () => {},
});

AppContext.displayName = "AppContext";