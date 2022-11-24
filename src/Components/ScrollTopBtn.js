import "./ScrollTopBtn.css";
import React from "react";

const ScrollTopBtn = ({ scrolled }) => {
    return (
        <div
            onClick={() => window.scrollTo(0, 0)}
            className={"scroll-top-btn " + (scrolled ? "scrolled" : "")}>
            <i className="bi bi-arrow-up"></i>
        </div>
    );
};

export default ScrollTopBtn;
