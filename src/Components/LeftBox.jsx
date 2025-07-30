import React from "react";
import { useState } from "react";
import ShowListButton from "./ShowListButton";
import LeftBoxList from "./LeftBoxList";

export default function RightBox({ movies }) {
    const [isOpen1, setIsOpen1] = useState(true);

    function toggleOpen() {
        setIsOpen1((open) => !open);
    }

    return (
        <div className="box">
            <ShowListButton isOpen={isOpen1} onOpen={toggleOpen} />
            {isOpen1 && <LeftBoxList movies={movies} />}
        </div>
    );
}
