import React, { useContext, useRef, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";
import style from "./style.module.css";
import { ReactComponent as SearchIcon } from "./img/ic-search.svg";
import { ReactComponent as CloseIcon } from "./img/ic-close-input.svg";



export const Search = ({ searchText = "" }) => {

    const [searchQuery, setSearchQuery] = useState("");
    const { handleInputChange, handleFormSubmit, clearSearch } = useContext(AppContext);

    useEffect(() => {
        setSearchQuery(searchText);
    }, [searchText]);
    
    const inputRef = useRef(null);

    const handleForm = (e) => {
        e.preventDefault();
        // handleFormSubmit && handleFormSubmit(e.target.querySelector(".input__emMnZ")?.value)
        handleFormSubmit && handleFormSubmit(inputRef.current?.value);
    }

    // handleClickClear(){ }

    return (
        <>
            <form className={style.search} onSubmit={handleForm}>
                <input
                    ref={inputRef}
                    onInput={(e) => handleInputChange && handleInputChange(e.target.value)}
                    type="text"
                    value={searchQuery}
                    placeholder="Поиск"
                    className={style.input}
                />
                <button className={style.btn}>
                    {searchQuery === ""
                        ? <SearchIcon />
                        : <CloseIcon onClick={clearSearch} />
                    }
                    {/* {searchQuery === "" ? <SearchIcon onClick={handleClick} /> : <CloseIcon onClick={clearSearch} />} */}
                </button>
            </form>
        </>
    );
}