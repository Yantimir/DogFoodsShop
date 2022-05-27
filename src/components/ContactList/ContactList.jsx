import React from "react";


export const ContactList = ({ contacts }) => {

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
