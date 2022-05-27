import React, { useContext } from "react";
import { AppContext } from "../../context/appContext";

export const ContactList = () => {

    const { contacts } = useContext(AppContext);

    return (
        <div>
            {contacts.map((contact) => (
                <div key={contact.phoneNumber}>
                    <p>{contact.name}</p>
                    <p>{contact.lastName}</p>
                    <p>{contact.phoneNumber}</p>
                </div>
            ))}
        </div>
    );
}
