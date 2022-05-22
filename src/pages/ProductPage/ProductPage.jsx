import React, { useContext, useState, useEffect } from "react";
import api from "../../utils/Api";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/appContext";

import Spinner from "../../components/Spinner/Spinner";
import { Product } from "../../components/Product/Product";




export const ProductPage = () => {

    const [product, setProduct] = useState([]);
    const { isLoading, cards } = useContext(AppContext);
    const { productID } = useParams(); // получение ID из URL

    useEffect(() => {
        api.getProductById(productID)
            .then((productData) => {
                setProduct(productData);
            })
            .catch((err) => console.log(err))
    }, [productID, cards]);
    
    return (
        <>
            {isLoading && <Spinner />}
            <Product {...product} />
        </>
    );
};
