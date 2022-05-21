import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import { PageProduct } from "./PageProduct";

ReactDOM.render(
    <BrowserRouter>
        <PageProduct />
    </BrowserRouter>, 
    document.querySelector("#root")
);