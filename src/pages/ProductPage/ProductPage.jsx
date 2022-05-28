import React, { useState, useCallback, useContext, useEffect } from "react";
import api from "../../utils/Api";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import { useApi } from "../../hooks/useApi";
import Spinner from "../../components/Spinner/Spinner";
import { NotFound } from "./../../components/NotFound/NotFound";
import { Product } from "../../components/Product/Product";


export const ProductPage = () => {

    const { cards } = useContext(AppContext);
    const { productID } = useParams(); // получение ID из URL
    const navigate = useNavigate();
    const [productData, setProductData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false)

    // const handler = useCallback(() => {
    //     return api.getProductById(productID);
    // }, [productID, cards]);
    // const { data: product, loading, error } = useApi(handler);

    function handleFormReviews(dataProduct) {
        setProductData(dataProduct);
    }

    useEffect(() => {
        setIsLoading(true);
        api.getProductById(productID)
            .then((dataProduct) => {
                setProductData(dataProduct);
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))
    }, [productID, cards]);


    return (
        <>
            {isLoading && <Spinner />}
            {isError && <NotFound
                title="Товары не найдены"
                buttonText="Назад"
                buttonAction={() => navigate(-1)}
            />}
            {productData && !isError
                && <Product
                    {...productData}
                    addReviews={handleFormReviews}
                />}
        </>
    );
};
