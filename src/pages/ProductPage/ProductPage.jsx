import React, { useCallback, useContext } from "react";
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

    const handler = useCallback(() => {
        return api.getProductById(productID);
    }, [productID, cards]);
    
    const { data: product, loading, error } = useApi(handler);

    return (
        <>
            {loading && <Spinner />}
            {error && <NotFound
                title="Товары не найдены"
                buttonText="Назад"
                buttonAction={() => navigate(-1)}
            />}
            {product && <Product {...product} />}
        </>
    );
};
