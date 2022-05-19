import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
    const [debounceValue, setdebounceValue] = useState(value);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setdebounceValue(value);
        }, delay);
        return () => clearTimeout(timeout);
    }, [value]);

    return debounceValue;
}

export default useDebounce;