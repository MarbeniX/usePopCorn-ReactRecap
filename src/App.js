import { useState } from "react";
import { tempMovieData } from "./data";
import Navbar from "./Components/Navbar";
import Main from "./Components/Main";

export default function App() {
    const [movies, setMovies] = useState(tempMovieData);

    return (
        <>
            <Navbar movies={movies} />
            <Main movies={movies} />
        </>
    );
}
