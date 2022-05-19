const onResponse = (response) => {
    return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
}

const onError = (err) => {
    alert("Что-то пошло не так!");
}

class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getProductsList() {
        return fetch(`${this._baseUrl}/products`, {
            headers: this._headers,
        }).then(onResponse)
            .catch(onError)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then(onResponse)
            .catch(onError)
    }

    searchProducts(searchQuery) {
        return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`, {
            headers: this._headers,
        }).then(onResponse)
            .catch(onError)
    }

    setUserInfo(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(userData),
        }).then(onResponse)
            .catch(onError)
    }

    changeLikeStatus(productId, isLike) {
        return fetch(`${this._baseUrl}/products/likes/${productId}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: this._headers,
        }).then(onResponse)
            .catch(onError)
    }


    getProductById(productId) {
        return fetch(`${this._baseUrl}/products/${productId}`, {
            headers: this._headers,
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