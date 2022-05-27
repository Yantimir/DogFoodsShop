import React, { useState } from "react";
import "./style.css";
import Button from "../Button/Button";

export const SimpleForm = ({ addContacts }) => {

    const [contactInfo, setContactInfo] = useState({
        name: "",
        lastName: "",
        phoneNumber: ""
    });

    function handleChangeContactInfo(e) {
        setContactInfo({
            ...contactInfo,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmitContactInfo(e) {
        e.preventDefault();
        addContacts(contactInfo);
        setContactInfo({
            name: "",
            lastName: "",
            phoneNumber: ""
        });
    }

    return (
        <form onSubmit={handleSubmitContactInfo}>
            <h3>Введите данные</h3>
            <input
                type="text"
                name="name"
                placeholder="Введите имя"
                value={contactInfo.name}
                onChange={handleChangeContactInfo}
            />
            <input
                type="text"
                name="lastName"
                placeholder="Введите фамилию"
                value={contactInfo.lastName}
                onChange={handleChangeContactInfo}
            />
            <input
                type="text"
                name="phoneNumber"
                placeholder="Введите телефон"
                value={contactInfo.phoneNumber}
                onChange={handleChangeContactInfo}
            />
            <Button
                type="secondary"
            // buttonAction={buttonAction}
            >Отправить
            </Button>
        </form>
    );
}
