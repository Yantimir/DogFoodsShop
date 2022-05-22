import React, { useContext } from "react";
import { AppContext } from "../../context/appContext";

import Spinner from "../../components/Spinner/Spinner";
import { Product } from "../../components/Product/Product";

export const ProductPage = () => {

    const { isLoading } = useContext(AppContext);
   
    return (
        <>
            {isLoading && <Spinner />}
            <Product />
        </>
    );
};
