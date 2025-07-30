import { useState } from "react";
import { tempWatchedData } from "../data";
import ShowListButton from "./ShowListButton";
import RightBoxList from "./RightBoxList";
import Summary from "./Summary";

export default function RightBox() {
    const [isOpen2, setIsOpen2] = useState(true);
    const [watched, setWatched] = useState(tempWatchedData);

    function toggleOpen() {
        setIsOpen2((open) => !open);
    }

    return (
        <div className="box">
            <ShowListButton isOpen={isOpen2} onOpen={toggleOpen} />
            {isOpen2 && (
                <>
                    <Summary watched={watched} />
                    <RightBoxList watched={watched} />
                </>
            )}
        </div>
    );
}
