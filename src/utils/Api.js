const onResponse = (response) => {
    return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
}

const onError = (err) => {
    console.log(`${err}`);
}

class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    // получение всех товаров
    getProductsList() {
        return fetch(`${this._baseUrl}/products`, {
            headers: this._headers,
        }).then(onResponse)
            .catch(onError)
    }
    // для поиска товаров
    searchProducts(searchQuery) {
        return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
            headers: this._headers,
        }).then(onResponse)
            .catch(onError)
    }
    // получение товара по id
    getProductById(productId) {
        return fetch(`${this._baseUrl}/products/${productId}`, {
            headers: this._headers,
        }).then(onResponse)
            // .catch(onError)
    }
    // создание нового товара
    createNewProduct(productData) {
        return fetch(`${this._baseUrl}/products`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(productData),
        }).then(onResponse)
            .catch(onError)
    }
    //редактирование товара по id
    editProduct(productData) {
        return fetch(`${this._baseUrl}/products/${productId}`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(productData),
        }).then(onResponse)
            .catch(onError)
    }
    //удаление товара по id
    deleteProduct(productId) {
        return fetch(`${this._baseUrl}/products/${productId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(onResponse)
            .catch(onError)
    }
    // установка/снятие лайка по id
    changeLikeStatus(productId, isLike) {
        return fetch(`${this._baseUrl}/products/likes/${productId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: this._headers,
        }).then(onResponse)
            .catch(onError)
    }
    // добавление отзыва по id
    addReview({name, city, rating, text}, productId) {
        return fetch(`${this._baseUrl}/products/review/${productId}`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name, city, rating, text
            }),
        }).then(onResponse)
            .catch(onError)
    }
    // удаление отзыва по id
    deleteReview(productId, reviewId) {
        return fetch(`${this._baseUrl}/products/review/${productId}/${reviewId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(onResponse)
            .catch(onError)
    }
    // получение всех отзывов
    getAllReview() {
        return fetch(`${this._baseUrl}/review`, {
            headers: this._headers,
        }).then(onResponse)
            .catch(onError)
    }
    // получение отзывов конкретного товара
    getReviewProduct() {
        return fetch(`${this._baseUrl}/review/${productId}`, {
            headers: this._headers,
        }).then(onResponse)
            .catch(onError)
    }


    //получение всех пользователей
    getAllUsers() {
        return fetch(`${this._baseUrl}/users`, {
            headers: this._headers,
        }).then(onResponse)
            .catch(onError)
    }
    // получение информации о пользователе по токену в заголовках
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then(onResponse)
            .catch(onError)
    }
    // получение информации о пользователе по его id
    getInfoUserById(userId) {
        return fetch(`${this._baseUrl}/users/${userId}`, {
            headers: this._headers,
        }).then(onResponse)
            .catch(onError)
    }
    // изменение name и about
    setUserInfo(userUpdate) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(userUpdate),
        }).then(onResponse)
            .catch(onError)
    }
    // изменение avatar
    setUserAvatar(userData) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(userData),
        }).then(onResponse)
            .catch(onError)
    }
}

const config = {
    baseUrl: "https://api.react-learning.ru",
    headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjJiNmZmYzA5YjEyZjgwZjRjMTBiYzAiLCJpYXQiOjE2NDcwMTM4ODcsImV4cCI6MTY3ODU0OTg4N30.rq4mXFpJ4lWkc1AYX9nFD6ygAtTjLdLs2l3cXmHcRRg',
        'Content-Type': 'application/json'
    }
}

const api = new Api(config);
export default api;