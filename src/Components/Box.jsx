import { useState } from "react";
import ShowListButton from "./ShowListButton";

export default function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    function toggleOpen() {
        setIsOpen((open) => !open);
    }

    return (
        <div className="box">
            <ShowListButton isOpen={isOpen} onOpen={toggleOpen} />
            {isOpen && children}
        </div>
    );
}
