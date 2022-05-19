import React, { useContext } from "react";
import { AppContext } from "../../context/appContext";
import style from "./style.module.css";
import { ReactComponent as SearchIcon } from "./img/ic-search.svg";
import { ReactComponent as CloseIcon } from "./img/ic-close-input.svg";


export const Search = () => {

    const { handlerInputChange, handlerFormSubmit } = useContext(AppContext);

    return (
        <>
            <form className={style.search} onSubmit={handlerFormSubmit}>
                <input
                    onInput={(e) => handlerInputChange(e.target.value)}
                    type="text"
                    placeholder="Поиск"
                    className={style.input}
                />
                <button className={style.btn}>
                    <SearchIcon />
                    {false && <CloseIcon />}
                    {/* {searchQuery === "" ? <SearchIcon onClick={handleClick} /> : <CloseIcon onClick={clearSearch} />} */}
                </button>
            </form>
        </>
    );
}