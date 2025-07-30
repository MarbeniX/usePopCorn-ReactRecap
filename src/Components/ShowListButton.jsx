import React from "react";

export default function ShowListButton({ isOpen, onOpen }) {
    return (
        <button className="btn-toggle" onClick={onOpen}>
            {isOpen ? "–" : "+"}
        </button>
    );
}
