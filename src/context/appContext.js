import React from "react";

export const AppContext = React.createContext({
    cards: [],
    currentUser: {},
    searchQuery: "",
    handlerInputChange: () => {},
    handlerFormSubmit: () => {},
    onUpdateUser: () => {}
    // favorites: [],
    // handleProductLike: () => {},
});

AppContext.displayName = "AppContext";